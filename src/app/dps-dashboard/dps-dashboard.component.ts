import { Component } from '@angular/core';

import {
  ChartConfiguration
} from 'chart.js';

import { CombatEvent } from '../models/combat-event.model';

import { LogParserService } from '../services/log-parser.service';

@Component({
  selector: 'app-dps-dashboard',
  templateUrl: './dps-dashboard.component.html',
  styleUrls: ['./dps-dashboard.component.scss']
})
export class DpsDashboardComponent {

  events: CombatEvent[] = [];

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

skillGroupStats: {
  name: string;
  totalDamage: number;
  highestDamage: number;
  lowestDamage: number;
  lowest: number;
  highest: number;
  average: number;
}[] = [];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };

  constructor(
    private parser: LogParserService
  ) {}

  onFile(event: any): void {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {

      const text = reader.result as string;

      this.events = this.parser.parse(text);
      console.log('RAW EVENTS:', this.events);

      this.calculateStats();

      this.buildCharts();
    };

    reader.readAsText(file);
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
  }

  buildTimeline(): void {

    const buckets: Record<number, number> = {};

    const start =
      this.events[0].timestamp;

    for (const event of this.events) {

      const second = Math.floor(
        (event.timestamp - start) / 1000
      );

      buckets[second] ??= 0;

      buckets[second] += event.calculatedDamage;
    }

    this.lineChartData = {

      labels: Object.keys(buckets),

      datasets: [
        {
          label: 'Damage Per Second',

          data: Object.values(buckets),

          tension: 0.25
        }
      ]
    };
  }

buildSkillBreakdown(): void {
  const map: Record<string, number> = {};
  const multipliers: Record<string, number[]> = {};

  for (const event of this.events) {
    const groupKey = this.getSkillGroupKey(event.skill);

    map[groupKey] ??= 0;
    map[groupKey] += event.calculatedDamage;

    multipliers[groupKey] ??= [];
    multipliers[groupKey].push(event.buffMultiplier);
  }

  this.pieChartData = {
    labels: Object.keys(map),
    datasets: [{ data: Object.values(map) }]
  };

this.skillGroupStats = Object.keys(multipliers).map(name => {
  const values = multipliers[name];
  const damages = this.events
    .filter(e => this.getSkillGroupKey(e.skill) === name)
    .map(e => e.calculatedDamage);

  return {
    name,
    totalDamage: damages.reduce((a, b) => a + b, 0),
    highestDamage: Math.max(...damages),
    lowestDamage: Math.min(...damages),
    lowest: Math.min(...values),
    highest: Math.max(...values),
    average: values.reduce((a, b) => a + b, 0) / values.length
  };
});
}


private getSkillGroupKey(skill: string): string {
  return skill
.replace(/(?:SSR|[Ll]evel|[Ll]v)\d+|\d+(?=_|$)/g, (match) => {
    return /^(?:SSR|[Ll]evel|[Ll]v)/.test(match) ? match : '';
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
