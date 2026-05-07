import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-joint-operation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './joint-operation.component.html',
  styleUrl: './joint-operation.component.scss'
})
export class JointOperationComponent implements OnInit {

  dungeons: any[] = [];

  private excludedSequences = [
    'droplist_frag_WeaponGashaponCoin',
    'Drop_teamFB_explist'
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getJointOps().subscribe((data) => {
      this.dungeons = this.transformData(data);
    });
  }

  private transformData(data: any): any[] {
    return Object.keys(data).map((dungeonName) => {
      const dungeon = data[dungeonName];

      const multiEntries = Object.entries(dungeon['Multi'] || {});
      const poorEntries = Object.entries(dungeon['Multi_Poor'] || {});

      const length = Math.max(multiEntries.length, poorEntries.length);

      const sequences: any[] = [];

      for (let i = 0; i < length; i++) {
        const [keyA, valA] = multiEntries[i] || [null, null];
        const [keyB, valB] = poorEntries[i] || [null, null];

        // 🔥 filter BEFORE pushing
        if (
          (keyA && this.isExcluded(keyA)) &&
          (keyB && this.isExcluded(keyB))
        ) {
          continue;
        }

        sequences.push({
          modeA: keyA && !this.isExcluded(keyA) ? valA : null,
          modeB: keyB && !this.isExcluded(keyB) ? valB : null
        });
      }

      return {
        name: dungeonName,
        sequences
      };
    });
  }

  private isExcluded(key: string): boolean {
    return this.excludedSequences.some(ex => key.includes(ex));
  }
getSequencePercent(meta: any, allSequences: any[]): string {
  const weights = allSequences
    .map(s => s?.Meta?.SequenceWeight)
    .filter(w => typeof w === 'number' && w > 0);

  const total = weights.reduce((a, b) => a + b, 0);

  if (!total || !meta?.SequenceWeight) return '—';

  return ((meta.SequenceWeight / total) * 100).toFixed(1) + '%';
}
  getItemDropPercent(item: any, items: any[]): string {
  const weights = items
    .map(i => i.Weight)
    .filter(w => w > 0);

  const total = weights.reduce((sum, w) => sum + w, 0);

  if (!total || item.Weight <= 0) return '—';

  const percent = (item.Weight / total) * 100;

  return percent.toFixed(2) + '%';
}
  getItemLabel(type: string): string {
    switch (type?.toUpperCase()) {
      case 'FRAGMENT':
        return 'Shard';
      case 'EQUIPMENT':
        return 'Item';
      default:
        return '';
    }
  }
  getRarityClass(quality: string): string {
    switch (quality?.toUpperCase()) {
      case 'COMMON': return 'common';
      case 'RARE': return 'rare';
      case 'EPIC': return 'epic';
      case 'LEGENDRY':
      case 'LEGENDARY': return 'legendary';
      default: return 'common';
    }
  }
}
