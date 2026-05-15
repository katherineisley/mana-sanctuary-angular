import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CombatEvent } from '../models/combat-event.model';
import { LogParserService } from '../services/log-parser.service';
import { environment } from '../environments/environment';

interface SkillMeta {
  file_name: string;
  file_path: string;
  damage_tags: string[];
  main_tag: string;
  type: string;
  element: string;
  source: string;
  slug: string;
  icon: string;
}

interface SkillGroupStat {
  name: string;
  totalDamage: number;
  highestDamage: number;
  percentageOfTotal: number;
  lowestDamage: number;
  lowest: number;
  highest: number;
  average: number;
  element: string | null;
  type: string | null;
  main_tag: string | null;
  source: string | null;
  slug: string | null;
  icon: string | null;
  damage_tags: string[] | null;
  originalSkills: string[]; // ADD THIS
}

@Component({
  selector: 'app-dps-dashboard',
  templateUrl: './dps-dashboard.component.html',
  styleUrls: ['./dps-dashboard.component.scss']
})
export class DpsDashboardComponent implements OnInit {

  events: CombatEvent[] = [];
  rawLog = '';
  totalDamage = 0;
  dps = 0;
  maxHit = 0;
  lowestAtk = 0;
  highestAtk = 0;
  atkIncreasePercent = 0;
  lowestCritDamage = 0;
  highestCritDamage = 0;
  averageCritDamage = 0;
  averageCritRate = 0;
  shareUrl = '';
  copySuccess = false;

  private skillMetaMap: Record<string, SkillMeta> = {};

  skillGroupStats: SkillGroupStat[] = [];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };
  elementRawChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };

  elementCalculatedChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };

  damageTypeRawChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };

  damageTypeCalculatedChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };

  sourceRawChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };

  sourceCalculatedChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 10,
          color: 'rgba(255,255,255,0.75)',
          font: {
            size: 11,
            family: 'inherit'
          }
        }
      }
    }
  };
  pieChartOptions2: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 14,
          boxHeight: 14,
          padding: 16,
          font: {
            size: 14
          },
          color: 'rgba(255,255,255,0.75)'
        }
      }
    },
    radius: '70%'
  };
  constructor(
    private parser: LogParserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('full snapshot.data:', this.route.snapshot.data);
    // Pull weaponSkill directly from the resolver data — no extra HTTP call needed
    const resolvedData = this.route.snapshot.data['data'];
    const weaponSkillData: SkillMeta[] = resolvedData?.weaponSkill ?? [];

    this.skillMetaMap = Object.fromEntries(
      weaponSkillData.map((entry: SkillMeta) => [entry.file_name, entry])
    );

    this.route.queryParams.subscribe(async params => {
      if (params['log']) {
        try {
          const response = await fetch(`${environment.apiUrl}/api/logs/${params['log']}`);
          const text = await response.text();
          const result = JSON.parse(text);
          this.rawLog = result.log;
          this.events = this.parser.parse(result.log);
          this.calculateStats();
          this.buildCharts();
        } catch (e) {
          console.error('Failed to load shared log', e);
        }
      }
    });
  }

  onFile(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const text = reader.result as string;
      this.rawLog = text;
      this.events = this.parser.parse(text);
      console.log('RAW EVENTS:', this.events);
      this.calculateStats();
      this.buildCharts();
      await this.generateShareUrl();
    };

    reader.readAsText(file);
  }

  async generateShareUrl(): Promise<void> {
    try {
      const response = await fetch(`${environment.apiUrl}/api/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ log: this.rawLog })
      });

      const text = await response.text();
      const result = JSON.parse(text);

      const url = `${window.location.origin}${window.location.pathname}?log=${result.id}`;
      this.shareUrl = url;

      this.router.navigate([], {
        queryParams: { log: result.id },
        replaceUrl: true
      });
    } catch (e) {
      console.error('Failed to generate share URL', e);
    }
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      this.copySuccess = true;
      setTimeout(() => this.copySuccess = false, 2000);
    });
  }

  calculateStats(): void {
    if (!this.events.length) {
      return;
    }

    const events = this.events.filter(e => !e.isSpecialDamage);

    if (!events.length) {
      return;
    }

    this.totalDamage = events.reduce((sum, e) => sum + e.calculatedDamage, 0);
    this.maxHit = Math.max(...events.map(x => x.calculatedDamage));

    const duration = (events[events.length - 1].timestamp - events[0].timestamp) / 1000;
    this.dps = this.totalDamage / duration;

    const atkValues = events.map(x => x.atk);
    this.lowestAtk = Math.min(...atkValues);
    this.highestAtk = Math.max(...atkValues);
    this.atkIncreasePercent = ((this.highestAtk - this.lowestAtk) / this.lowestAtk) * 100;

    const critDamageValues = events.map(x => x.critDamageMultiplier);
    this.lowestCritDamage = Math.min(...critDamageValues);
    this.highestCritDamage = Math.max(...critDamageValues);
    this.averageCritDamage = critDamageValues.reduce((a, b) => a + b, 0) / critDamageValues.length;

    const critHits = events.filter(x => x.critDamageMultiplier > 1).length;
    this.averageCritRate = critHits / events.length;
  }

  buildCharts(): void {
    this.buildTimeline();
    this.buildSkillBreakdown();
    this.buildCategoryCharts();
  }

  buildTimeline(): void {
    const buckets: Record<number, number> = {};
    const start = this.events[0].timestamp;

    for (const event of this.events) {
      const second = Math.floor((event.timestamp - start) / 1000);
      buckets[second] ??= 0;
      buckets[second] += event.calculatedDamage;
    }

    this.lineChartData = {
      labels: Object.keys(buckets),
      datasets: [{
        label: 'Damage Per Second',
        data: Object.values(buckets),
        tension: 0.25
      }]
    };
  }
  private buildPercentagePieChart(
    keyGetter: (row: SkillGroupStat) => string[],
    valueGetter: (event: CombatEvent) => number
  ): ChartConfiguration<'pie'>['data'] {

    const totals: Record<string, number> = {};

    for (const event of this.events) {

      const groupKey = this.getSkillGroupKey(event.skill);

      const row = this.skillGroupStats.find(x => x.name === groupKey);

      if (!row) {
        continue;
      }

      const keys = keyGetter(row);

      for (const key of keys) {

        if (!key) {
          continue;
        }

        totals[key] ??= 0;
        totals[key] += valueGetter(event);
      }
    }

    return {
      labels: Object.keys(totals),
      datasets: [{
        data: Object.values(totals)
      }]
    };
  }
  private buildCategoryCharts(): void {

    // ELEMENT

    this.elementRawChartData = this.buildPercentagePieChart(
      row => row.element ? [row.element] : [],
      event => event.rawDamage
    );

    this.elementCalculatedChartData = this.buildPercentagePieChart(
      row => row.element ? [row.element] : [],
      event => event.calculatedDamage
    );

    // DAMAGE TYPE

    this.damageTypeRawChartData = this.buildPercentagePieChart(
      row => row.main_tag ? [row.main_tag] : [],
      event => event.rawDamage
    );

    this.damageTypeCalculatedChartData = this.buildPercentagePieChart(
      row => row.main_tag ? [row.main_tag] : [],
      event => event.calculatedDamage
    );

    // SOURCE

    this.sourceRawChartData = this.buildPercentagePieChart(
      row => row.source ? [row.source] : [],
      event => event.rawDamage
    );

    this.sourceCalculatedChartData = this.buildPercentagePieChart(
      row => row.source ? [row.source] : [],
      event => event.calculatedDamage
    );
  }
  private normaliseSkillKey(raw: string): string {
    return raw.replace(/_C$/, '');
  }

  buildSkillBreakdown(): void {
    const map: Record<string, number> = {};
    const multipliers: Record<string, number[]> = {};
    const rawSkillNames: Record<string, Set<string>> = {};

    for (const event of this.events) {
      const groupKey = this.getSkillGroupKey(event.skill);
      map[groupKey] ??= 0;
      map[groupKey] += event.calculatedDamage;
      multipliers[groupKey] ??= [];
      multipliers[groupKey].push(event.buffMultiplier);
      rawSkillNames[groupKey] ??= new Set<string>();
      rawSkillNames[groupKey].add(event.skill);
    }
    // ADD THIS — check what raw names look like vs your JSON keys
    console.log('rawSkillNames:', rawSkillNames);
    console.log('skillMetaMap keys:', Object.keys(this.skillMetaMap));
    const totalDamageAll = Object.values(map).reduce((a, b) => a + b, 0);

    this.skillGroupStats = Object.keys(multipliers)
      .map(name => {
        const values = multipliers[name];
        const damages = this.events
          .filter(e => this.getSkillGroupKey(e.skill) === name)
          .map(e => e.calculatedDamage);
        const totalDamage = damages.reduce((a, b) => a + b, 0);

        const firstSkill = [...rawSkillNames[name]][0];
        const meta = this.skillMetaMap[this.normaliseSkillKey(firstSkill)] ?? null;

        return {
          name,
          totalDamage,
          percentageOfTotal: totalDamageAll > 0 ? (totalDamage / totalDamageAll) : 0,
          highestDamage: Math.max(...damages),
          lowestDamage: Math.min(...damages),
          lowest: Math.min(...values),
          highest: Math.max(...values),
          average: values.reduce((a, b) => a + b, 0) / values.length,
          type: meta?.type ?? null,
          element: meta?.element ?? null,
          main_tag: meta?.main_tag ?? null,
          source: meta?.source ?? null,
          slug: meta?.slug ?? null,
          icon: meta?.icon ?? null,
          damage_tags: meta?.damage_tags ?? null,
          originalSkills: [...rawSkillNames[name]],
        };
      })
      .sort((a, b) => b.totalDamage - a.totalDamage);

    this.pieChartData = {
      labels: this.skillGroupStats.map(s => s.name),
      datasets: [{ data: this.skillGroupStats.map(s => s.totalDamage) }]
    };
  }

  private getSkillGroupKey(skill: string): string {
    return skill
      .replace(/(?:SSR|SSR_|Orange_Skill|[Aa]rtifact|MMO|MMO_|[Mm]atrix]|[Ll]evel|[Ll]v)\d+|\d+(?=_|$)/g, (match) => {
        return /^(?:SSR|SSR_|Orange_Skill|[Aa]rtifact|MMO|MMO_|[Mm]atrix]|[Ll]evel|[Ll]v)/.test(match) ? match : '';
      })
      .replace(/__+/g, '_')
      .replace(/^_|_$/g, '')
      .replace(/_C$/, '')
      .replace(/^GE_/, '')
      .replace(/^Damage_/, '')
      .replace(/_damage$/, '')
      .replace(/_Damage$/, '')
      .replace(/_Balance$/, '')
      .replace(/_balance$/, '')
      .replace(/_damage$/, '')
      .replace(/_Damage$/, '')
  }
}
