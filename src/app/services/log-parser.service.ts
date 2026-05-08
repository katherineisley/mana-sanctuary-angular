import { Injectable } from '@angular/core';
import { CombatEvent } from '../models/combat-event.model';

@Injectable({
  providedIn: 'root'
})
export class LogParserService {

  parse(text: string): CombatEvent[] {
    return text
      .split('\n')
      .map(l => l.trim().replace(/^\uFEFF/, '')) // strip BOM/invisible chars per line
      .filter(Boolean)
      .map(line => this.parseLine(line));
  }

  private parseLine(line: string): CombatEvent {
  // --- Timestamp ---
  const timestampMatch = line.match(/\[([^\]]+)\]/);
  const timestampRaw = timestampMatch?.[1] ?? '';
  let rest = line.slice((timestampMatch?.[0].length ?? 0)).trim();

  // --- Skill name ---
  const skillMatch = rest.match(/^(\S+)\s+/);
  const skill = skillMatch?.[1] ?? '';
  rest = rest.slice(skill.length).trim();

  // --- Special case: ConductExtraDamage ---
  if (skill === 'ConductExtraDamage') {
    const numbers = [...rest.matchAll(/\d[\d,]*\.?\d*/g)]
      .map(m => parseFloat(m[0].replace(/,/g, '')))
      .filter(n => !isNaN(n) && n > 0);

    const calculatedDamage = numbers[numbers.length - 4] ?? 0;

    return {
      timestamp: this.parseTimestamp(timestampRaw),
      skill,
      source: '',
      target: '',
      atk: 0,
      skillMultiplier: 0,
      rawDamage: calculatedDamage,
      critDamageMultiplier: 1,
      noCsZoneDebuff: 1,
      buffMultiplier: 1,
      calculatedDamage,
      isSpecialDamage: true,
    };
  }

  // --- Normal parsing ---
  const textAndNumbers = rest.split(/\s+/);
  const firstNumIndex = textAndNumbers.findIndex(t => /^-?\d/.test(t));
  const source = textAndNumbers[0] ?? '';
  const target = textAndNumbers.slice(1, firstNumIndex).join(' ');

  const numbers = textAndNumbers
    .slice(firstNumIndex)
    .map(t => parseFloat(t.replace(/,/g, '')))
    .filter(n => !isNaN(n));

  const n = numbers.length;
  const atk             = numbers[n - 14];
  const skillMultiplier = numbers[n - 13];
  const rawDamage       = numbers[n - 11];
  const critDmgMult     = numbers[n - 10];
  const noCsDebuff      = numbers[n - 9];
  const randomRoll      = numbers[n - 7];
  const buffMultiplier  = numbers[n - 3];
  const calculatedDamage = rawDamage * critDmgMult * noCsDebuff * buffMultiplier;

  return {
    timestamp: this.parseTimestamp(timestampRaw),
    skill,
    source,
    target,
    atk,
    skillMultiplier,
    rawDamage,
    critDamageMultiplier: critDmgMult,
    noCsZoneDebuff: noCsDebuff,
    buffMultiplier,
    calculatedDamage,
    isSpecialDamage: false,
  };
}
  private parseTimestamp(raw: string): number {
    const match = raw.match(/(\d+)\.(\d+)\.(\d+)-(\d+)\.(\d+)\.(\d+):(\d+)/);
    if (!match) return 0;
    const [, year, month, day, hour, minute, second, ms] = match.map(Number);
    return new Date(year, month - 1, day, hour, minute, second, ms).getTime();
  }
}
