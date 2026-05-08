export interface CombatEvent {

  timestamp: number;

  skill: string;

  source: string;

  target: string;

  atk: number;

  skillMultiplier: number;

  rawDamage: number;

  critDamageMultiplier: number;

  noCsZoneDebuff: number;

  //randomDamageRoll: number;

  buffMultiplier: number;

  calculatedDamage: number;

  isSpecialDamage: boolean;  // <-- add this
}
