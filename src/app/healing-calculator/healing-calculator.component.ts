import { Component, HostListener, OnInit, Renderer2, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Unit, Matrix, Relic, Heal, Buff, Data, Character, BuffSummary } from './models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-healing-calculator',
  templateUrl: './healing-calculator.component.html',
  styleUrls: ['./healing-calculator.component.scss']
})

export class HealingCalculatorComponent implements OnInit {
  errors = new Set<string>();
  units: any[] = [];
  matrices: any[] = [];
  traits: any[] = [];
  relics: any[] = [];
  unitsNumbers: any[] = [];
  currentUnitSetId!: number;
  currentMatrixSelectIndex!: number;
  currentRelicSelectIndex!: number;
  showAllUnits = false;
  showAllMatrices = false;
  showAllTraits = false;
  showAllRelics = false;
  activeInfo: string = 'Summary';

  // STATS
  hpStat!: number;
  critStat!: number;
  critRateStat!: number;
  critDmgStat!: number;
  physicalAtkStat!: number;
  flameAtkStat!: number;
  frostAtkStat!: number;
  voltAtkStat!: number;
  alteredAtkStat!: number;

  // TITAN
  titanHealing!: number;
  isButtonPressed: boolean = false;

  professionResonance: string[] = [];
  elementResonance: string[] = [];
  buffs: Buff[] = [];
  teamBuffs: Buff[] = [];
  selfBuffs: Buff[] = [];
  buffsSummaryFrontEnd: any[] = [];
  buffsSummary: BuffSummary;
  teamBuffsSummary: BuffSummary;
  selfBuffsSummary: BuffSummary;
  teamBuffsSummaryFrontEnd: any[] = [];
  selfBuffsSummaryFrontEnd: any[] = [];

  calculatedPhysicalBase!: number;
  calculatedFlameBase!: number;
  calculatedFrostBase!: number;
  calculatedVoltBase!: number;

  calculatedFlameATK!: number;
  calculatedFrostATK!: number;
  calculatedVoltATK!: number;
  calculatedPhysicalATK!: number;

  calculatedHP!: number;

  calculatedCrit!: number;
  calculatedCritRate!: number;
  calculatedCritDamage!: number;

  dodgeCooldown: number = 4;
  dischargeCooldown: number = 10;

  ATKCritRatio!: number;
  healingBuff!: number;

  critFormulaMulti: number = 282.13;
  critPercent!: number;

  totalHeal: number = 0;
  totalShield: number = 0;

  splittingPatterns: Record<string, string[]> = {
    "element_frostvolt": ["element_frost", "element_volt"],
    "element_voltfrost": ["element_volt", "element_frost"],
    "element_physicalflame": ["element_physical", "element_flame"],
    "element_flamephysical": ["element_flame", "element_physical"],
  };

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private http: HttpClient, private renderer: Renderer2, private el: ElementRef) {
    this.buffsSummary = {};
    this.teamBuffsSummary = {};
    this.selfBuffsSummary = {};
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    const data = this.route.snapshot.data['data'];
    this.units = data.simulacraHealingCalculator;
    this.traits = data.simulacraHealingCalculator;
    this.matrices = data.matrices;
    this.relics = data.relics;
    this.unitsNumbers = data.simulacraNumbers;
  }

  setPositionAndStyle(event: Event, selector: string, renderer: Renderer2, el: ElementRef) {
    const clickedElement = event.target as HTMLElement;
    const rect = clickedElement.getBoundingClientRect();
    const docEl = document.documentElement;
    const offset = 20; // offset in pixels

    const top = rect.top + window.pageYOffset - docEl.clientTop;
    const left = rect.left + window.pageXOffset - docEl.clientLeft;

    const targetElement = el.nativeElement.querySelector(selector);
    renderer.setStyle(targetElement, 'top', `${top}px`);
    renderer.setStyle(targetElement, 'left', `${left + rect.width + offset}px`);
  }

  toggleUnitSelect(event: Event, clickedUnitSetId: number) {
    this.currentUnitSetId = clickedUnitSetId;

    event.stopPropagation();
    this.showAllUnits = !this.showAllUnits;

    this.setPositionAndStyle(event, '.all-units', this.renderer, this.el);
  }

  toggleMatrixSelect(event: Event, clickedUnitSetId: number, clickedMatrixSelect: number) {
    this.currentUnitSetId = clickedUnitSetId;
    this.currentMatrixSelectIndex = clickedMatrixSelect;

    event.stopPropagation();
    this.showAllMatrices = !this.showAllMatrices;

    this.setPositionAndStyle(event, '.all-matrices', this.renderer, this.el);
  }

  toggleTraitSelect(event: Event) {
    event.stopPropagation();
    this.showAllTraits = !this.showAllTraits;

    this.setPositionAndStyle(event, '.all-traits', this.renderer, this.el);
  }

  toggleRelicSelect(event: Event, clickedRelicSelect: number) {
    this.currentRelicSelectIndex = clickedRelicSelect;

    event.stopPropagation();
    this.showAllRelics = !this.showAllRelics;

    this.setPositionAndStyle(event, '.all-relics', this.renderer, this.el);
  }

  changeThumbnailUnit(clickedEntry: any) {
    const value = clickedEntry.slug;

    const avatarSrc = `assets/simulacra/${value}_avatar.webp`;
    const selectElement = this.el.nativeElement.querySelector(`.unit[data-unit="${this.currentUnitSetId}"] .simulacra-select img`);
    selectElement.src = avatarSrc;
    selectElement.parentElement.setAttribute('data-simulacra', value);

    console.log(clickedEntry);
    console.log("Current Unit Set ID", this.currentUnitSetId);
  }

  changeThumbnailMatrix(clickedEntry: any) {
    const value = clickedEntry.slug;

    const avatarSrc = `assets/matrices/${value}_matrix.webp`;
    const selectElement = this.el.nativeElement.querySelector(`.unit[data-unit="${this.currentUnitSetId}"] .matrix-select-container:nth-child(${this.currentMatrixSelectIndex}) .matrix-select img`);
    selectElement.src = avatarSrc;
    selectElement.parentElement.setAttribute('data-matrix', value);

    console.log(clickedEntry);
    console.log("Current Unit Set ID", this.currentUnitSetId);
    console.log("Current Matrix Select Index", this.currentMatrixSelectIndex);
  }

  changeThumbnailTrait(clickedEntry: any) {
    const value = clickedEntry.slug;

    const avatarSrc = `assets/simulacra/${value}_avatar.webp`;
    const selectElement = this.el.nativeElement.querySelector(`.trait-select img`);
    selectElement.src = avatarSrc;
    selectElement.parentElement.setAttribute('data-trait', value);

    console.log(clickedEntry);
    console.log("Current Unit Set ID", this.currentUnitSetId);
  }

  changeThumbnailRelic(clickedEntry: any) {
    const value = clickedEntry.slug;

    const avatarSrc = `assets/relics/${value}_relic.webp`;
    const selectElement = this.el.nativeElement.querySelector(`.relic-select-container:nth-child(${this.currentRelicSelectIndex}) .relic-select img`);
    selectElement.src = avatarSrc;
    selectElement.parentElement.setAttribute('data-relic', value);

    console.log(clickedEntry);
  }

  currentAdvancementLevel(event: Event) {
    let target = event.target as HTMLElement;
    // this is retarded because the path is on TOP of the svg, despite the path being the child of the svg WITH NO Z-INDEX
    // this wasted like 20 minutes of my life because i couldn't figure out why stars with "active" kept getting its "active" removed when clicked
    // but it worked properly if i clicked the very edge of the star
    if (target.tagName.toLowerCase() === 'path') {
      target = target.closest('svg') as unknown as HTMLElement;
    }

    const advancementLevel = Number(target.getAttribute('data-advancement-level'));
    const parentStarsDiv = target.closest('.stars'); // prevents from selecting ALL the stars on the page

    if (parentStarsDiv) {
      const svgElements = parentStarsDiv.querySelectorAll('svg');

      svgElements.forEach((svg: SVGSVGElement) => {
        const level = Number(svg.getAttribute('data-advancement-level'));
        const shouldBeActive = level <= advancementLevel;

        if (shouldBeActive) {
          this.renderer.addClass(svg, 'active');
        } else {
          this.renderer.removeClass(svg, 'active');
        }
      });
    }
  }
  // Finds the profession resonance of the team
  findProfessionResonance(unitValues: Unit[]) {
    const resonanceCount: { [key: string]: number } = {};

    unitValues.forEach(unit => {
      const simulacra = this.units.find(s => s.slug === unit.simulacraName);
      const resonance = simulacra ? simulacra.resonance : 'Unknown resonance';
      if (resonance in resonanceCount) {
        resonanceCount[resonance]++;
      } else {
        resonanceCount[resonance] = 1;
      }
    });

    // Find a resonance that appears at least twice
    for (const resonance in resonanceCount) {
      if (resonanceCount[resonance] >= 2) {
        this.professionResonance.push(resonance);
      }
    }

  }

  // Finds the elemental resonance/s of the team
  findElementResonance(unitValues: Unit[]) {
    const characterElements: string[] = unitValues.map(unit => {
      const characterData = this.units.find(simulacra => simulacra.slug === unit.simulacraName);
      return characterData ? characterData.element : '';
    });

    const mappedElements: string[] = characterElements.map(element => {
      const pattern = this.splittingPatterns[element];
      return pattern ? pattern : [element];
    }).flat();

    const elementCount: { [key: string]: number } = {};

    mappedElements.forEach(element => {
      if (element in elementCount) {
        elementCount[element]++;
      } else {
        elementCount[element] = 1;
      }
    });

    // Collect all elements that appear at least twice
    const commonElements: string[] = [];
    for (const element in elementCount) {
      if (elementCount[element] >= 2) {
        commonElements.push(element);
      }
    }
    this.elementResonance = commonElements;
  }

  collectResonanceBuffs(unitValues: Unit[]) {
    unitValues.forEach(unit => {
      for (const data of this.unitsNumbers) {
        if (data.slug === unit.simulacraName) {
          for (const resonance of data.resonance) {
            if (resonance.buff && this.professionResonance.includes(resonance.buff.applicationRequirement) && resonance.buff.requiredStar <= unit.starValue && (!resonance.buff.ignore || !resonance.buff.ignore.includes(unit.starValue))) {

              const copiedBuff = { ...resonance.buff };

              copiedBuff.maxBuff = resonance.buff.value * resonance.buff.stacks;
              copiedBuff.avgBuff = resonance.buff.value * resonance.buff.stacks;
              copiedBuff.originItem = data.slug;
              copiedBuff.originSource = "resonance";
              this.buffs.push(copiedBuff);

            }
          }
          for (const resonance of data.resonance) {
            if (resonance.buff && this.elementResonance.includes(resonance.buff.applicationRequirement) && resonance.buff.requiredStar <= unit.starValue && (!resonance.buff.ignore || !resonance.buff.ignore.includes(unit.starValue))) {

              const copiedBuff = { ...resonance.buff };

              copiedBuff.maxBuff = resonance.buff.value * resonance.buff.stacks;
              copiedBuff.avgBuff = resonance.buff.value * resonance.buff.stacks;
              copiedBuff.originItem = data.slug;
              copiedBuff.originSource = "resonance";
              this.buffs.push(copiedBuff);

            }
          }
        }
      }
    });
  }


  collectAllBuffs(unitValues: Unit[]) {
    unitValues.forEach(unit => {
      const weapon = unit.simulacraName;
      const star = unit.starValue;
      for (const data of this.unitsNumbers) {
        if (data.slug === weapon) {
          for (const dodge of data.dodge) {
            if (dodge.buff && dodge.buff.requiredStar <= star && (!dodge.buff.ignore || !dodge.buff.ignore.includes(star))) {

              const copiedBuff = { ...dodge.buff };

              copiedBuff.maxBuff = 'value1';
              copiedBuff.avgBuff = 'value2';
              copiedBuff.originItem = data.slug;
              copiedBuff.originSource = "dodge";
              this.buffs.push(copiedBuff);

            }
          }

          for (const skill of data.skill) {
            if (skill.buff && skill.buff.requiredStar <= star && (!skill.buff.ignore || !skill.buff.ignore.includes(star))) {

              const copiedBuff = { ...skill.buff };

              copiedBuff.maxBuff = 'value1';
              copiedBuff.avgBuff = 'value2';
              copiedBuff.originItem = data.slug;
              copiedBuff.originSource = "skill";
              this.buffs.push(copiedBuff);

            }
          }

          for (const discharge of data.discharge) {
            if (discharge.buff && discharge.buff.requiredStar <= star && (!discharge.buff.ignore || !discharge.buff.ignore.includes(star))) {

              const copiedBuff = { ...discharge.buff };

              copiedBuff.maxBuff = 'value1';
              copiedBuff.avgBuff = 'value2';
              copiedBuff.originItem = data.slug;
              copiedBuff.originSource = "discharge";
              this.buffs.push(copiedBuff);

            }
          }

          for (const attack of data.attack) {
            if (attack.buff && attack.buff.requiredStar <= star && (!attack.buff.ignore || !attack.buff.ignore.includes(star))) {

              const copiedBuff = { ...attack.buff };

              copiedBuff.maxBuff = attack.buff.value * attack.buff.stacks;

              if ((attack.buff.duration / attack.buff.cooldown) >= 1) {
                copiedBuff.avgBuff = copiedBuff.maxBuff
              }
              else {
                copiedBuff.avgBuff = (attack.buff.duration / attack.buff.cooldown) * copiedBuff.maxBuff
              }

              copiedBuff.originItem = data.slug;
              copiedBuff.originSource = "attack";
              this.buffs.push(copiedBuff);

            }
          }

          for (const passive of data.passive) {
            if (passive.buff && passive.buff.requiredStar <= star && (!passive.buff.ignore || !passive.buff.ignore.includes(star))) {

              const copiedBuff = { ...passive.buff };

              copiedBuff.maxBuff = 'value1';
              copiedBuff.avgBuff = 'value2';
              copiedBuff.originItem = data.slug;
              copiedBuff.originSource = "passive";
              this.buffs.push(copiedBuff);

            }
          }
        }
      }
    });
  }

  summarizeBuffs(): Record<string, Record<string, number>> {
    const summary: Record<string, Record<string, number>> = {};

    this.buffs.forEach(buff => {
      if (!summary[buff.module]) {
        summary[buff.module] = {};
      }
      if (!summary[buff.module][buff.type]) {
        summary[buff.module][buff.type] = 0;
      }
      summary[buff.module][buff.type] += buff.value;
    });
    return summary;
  }

  summarizeBuffsFrontEnd(): any[] {
    const summary: any[] = [];

    // Loop through each buff
    this.buffs.forEach(buff => {
      // Check if there is an existing entry for the module
      const moduleIndex = summary.findIndex((item: any) => item.module === buff.module);
      if (moduleIndex === -1) {
        // If module doesn't exist in summary, add a new entry
        summary.push({ module: buff.module, buffs: [{ type: buff.type, value: buff.value }] });
      } else {
        // If module exists, check if the buff type already exists
        const buffIndex = summary[moduleIndex].buffs.findIndex((b: any) => b.type === buff.type);
        if (buffIndex === -1) {
          // If buff type doesn't exist, add a new entry
          summary[moduleIndex].buffs.push({ type: buff.type, value: buff.value });
        } else {
          // If buff type exists, update its value
          summary[moduleIndex].buffs[buffIndex].value += buff.value;
        }
      }
    });

    return summary;
  }

  summarizeBuffGroupsFrontEnd() {
    // Loop through each buff
    this.buffs.forEach(buff => {
      if (buff.affect === "team") {
        // Check if there is an existing entry for the module
        const moduleIndex = this.teamBuffsSummaryFrontEnd.findIndex((item: any) => item.module === buff.module);
        if (moduleIndex === -1) {
          // If module doesn't exist in summary, add a new entry
          this.teamBuffsSummaryFrontEnd.push({ module: buff.module, buffs: [{ type: buff.type, value: buff.value }] });
        } else {
          // If module exists, check if the buff type already exists
          const buffIndex = this.teamBuffsSummaryFrontEnd[moduleIndex].buffs.findIndex((b: any) => b.type === buff.type);
          if (buffIndex === -1) {
            // If buff type doesn't exist, add a new entry
            this.teamBuffsSummaryFrontEnd[moduleIndex].buffs.push({ type: buff.type, value: buff.value });
          } else {
            // If buff type exists, update its value
            this.teamBuffsSummaryFrontEnd[moduleIndex].buffs[buffIndex].value += buff.value;
          }
        }
      }
      else if (buff.affect === "self") {
        // Check if there is an existing entry for the module
        const moduleIndex = this.selfBuffsSummaryFrontEnd.findIndex((item: any) => item.module === buff.module);
        if (moduleIndex === -1) {
          // If module doesn't exist in summary, add a new entry
          this.selfBuffsSummaryFrontEnd.push({ module: buff.module, buffs: [{ type: buff.type, value: buff.value }] });
        } else {
          // If module exists, check if the buff type already exists
          const buffIndex = this.selfBuffsSummaryFrontEnd[moduleIndex].buffs.findIndex((b: any) => b.type === buff.type);
          if (buffIndex === -1) {
            // If buff type doesn't exist, add a new entry
            this.selfBuffsSummaryFrontEnd[moduleIndex].buffs.push({ type: buff.type, value: buff.value });
          } else {
            // If buff type exists, update its value
            this.selfBuffsSummaryFrontEnd[moduleIndex].buffs[buffIndex].value += buff.value;
          }
        }
      }
    });

  }
  summarizeBuffGroups() {

    this.buffs.forEach(buff => {
      if (buff.affect === "team") {
        if (!this.teamBuffsSummary[buff.module]) {
          this.teamBuffsSummary[buff.module] = {};
        }
        if (!this.teamBuffsSummary[buff.module][buff.type]) {
          this.teamBuffsSummary[buff.module][buff.type] = 0;
        }
        this.teamBuffsSummary[buff.module][buff.type] += buff.value;
      } else if (buff.affect === "self") {
        if (!this.selfBuffsSummary[buff.module]) {
          this.selfBuffsSummary[buff.module] = {};
        }
        if (!this.selfBuffsSummary[buff.module][buff.type]) {
          this.selfBuffsSummary[buff.module][buff.type] = 0;
        }
        this.selfBuffsSummary[buff.module][buff.type] += buff.value;
      }
    });

  }

  collectBuffsSummary() {
    this.teamBuffs = this.buffs.filter(buff => buff.affect === 'team');
    this.selfBuffs = this.buffs.filter(buff => buff.affect === 'self');
    this.summarizeBuffGroups();
    this.summarizeBuffGroupsFrontEnd();
    this.buffsSummary = this.summarizeBuffs();
    this.buffsSummaryFrontEnd = this.summarizeBuffsFrontEnd();

    console.log(this.teamBuffs)
    console.log(this.selfBuffs)
    console.log(this.buffsSummary)
    console.log(this.selfBuffsSummary)
    console.log(this.teamBuffsSummary)
  }

  calculateAttackCritHeal() {

    this.critPercent = this.critStat / this.critFormulaMulti;

    this.calculatedPhysicalBase = this.physicalAtkStat + this.physicalAtkStat * (this.buffsSummary['Attack']?.['Base'] ?? 0)
    this.calculatedFlameBase = this.flameAtkStat + this.flameAtkStat * (this.buffsSummary['Attack']?.['Base'] ?? 0)
    this.calculatedFrostBase = this.frostAtkStat + this.frostAtkStat * (this.buffsSummary['Attack']?.['Base'] ?? 0)
    this.calculatedVoltBase = this.voltAtkStat + this.voltAtkStat * (this.buffsSummary['Attack']?.['Base'] ?? 0)

    this.calculatedFlameATK = this.calculatedFlameBase + (this.calculatedFlameBase * (((this.buffsSummary['Attack']?.['Flame'] ?? 0) + (this.buffsSummary['Attack']?.['Common'] ?? 0)) / 100));
    this.calculatedFrostATK = this.calculatedFrostBase + (this.calculatedFrostBase * (((this.buffsSummary['Attack']?.['Frost'] ?? 0) + (this.buffsSummary['Attack']?.['Common'] ?? 0)) / 100));
    this.calculatedVoltATK = this.calculatedVoltBase + (this.calculatedVoltBase * (((this.buffsSummary['Attack']?.['Volt'] ?? 0) + (this.buffsSummary['Attack']?.['Common'] ?? 0)) / 100));
    this.calculatedPhysicalATK = this.calculatedPhysicalBase + (this.calculatedPhysicalBase * (((this.buffsSummary['Attack']?.['Physical'] ?? 0) + (this.buffsSummary['Attack']?.['Common'] ?? 0)) / 100));

    this.calculatedCrit = this.critPercent + this.critRateStat + (this.buffsSummary['Crit']?.['CritRate'] ?? 0);
    this.calculatedCritDamage = this.critDmgStat + (this.buffsSummary['Crit']?.['CritDamage'] ?? 0);
    /// add buffs for hp 
    this.calculatedHP = this.hpStat;

    this.healingBuff = this.professionResonance.includes("benediction") ? 2 : 1;
    this.healingBuff = this.healingBuff * (this.buffsSummary['Standard']?.['Healing'] ?? 1) * (this.buffsSummary['Matrix']?.['Healing'] ?? 1) * (this.buffsSummary['WeaponPassive']?.['Healing'] ?? 1) * (this.buffsSummary['WeaponActive']?.['Healing'] ?? 1);
  }


  calculateATKCritRatio(element: string | undefined): number {
    const Flame = this.calculatedFlameATK * (1 + this.calculatedCritDamage / 100) * (this.calculatedCrit / 100) + this.calculatedFlameATK * ((100 - this.calculatedCrit) / 100);
    const Physical = this.calculatedPhysicalATK * (1 + this.calculatedCritDamage / 100) * (this.calculatedCrit / 100) + this.calculatedPhysicalATK * ((100 - this.calculatedCrit) / 100);
    const Volt = this.calculatedVoltATK * (1 + this.calculatedCritDamage / 100) * (this.calculatedCrit / 100) + this.calculatedVoltATK * ((100 - this.calculatedCrit) / 100);
    const Frost = this.calculatedFrostATK * (1 + this.calculatedCritDamage / 100) * (this.calculatedCrit / 100) + this.calculatedFrostATK * ((100 - this.calculatedCrit) / 100);
    const elementsArray = [Flame, Physical, Volt, Frost]

    switch (element) {
      case 'element_flame':
        return Flame
      case 'element_physical':
        return Physical
      case 'element_volt':
        return Volt
      case 'element_frost':
        return Frost
      case 'element_altered':
        return Math.max(...elementsArray);
      default:
        throw new Error('Invalid element');
    }
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  calculateHealing(unitValues: Unit[]) {
    unitValues.forEach(unit => {
      const weapon = unit.simulacraName;
      const star = unit.starValue;
      const data = this.units.find(simulacra => simulacra.slug === unit.simulacraName);
      const elementString = this.splittingPatterns[data.element] ?? [data.element];
      const element = elementString[0]

      this.ATKCritRatio = this.calculateATKCritRatio(element);

      for (const data of this.unitsNumbers) {
        if (data.slug === weapon) {
          for (const dodge of data.dodge) {
            if (dodge.heal && dodge.heal.requiredStar <= star && (!dodge.heal.ignore || !dodge.heal.ignore.includes(star))) {

              const multiplierStat = dodge.heal.stat.toLowerCase() === "atk" ? this.ATKCritRatio : this.calculatedHP;
              const healValue = ((dodge.heal.multiplier / 100) * multiplierStat * dodge.heal.ticks * this.healingBuff) / this.dodgeCooldown;

              if (dodge.heal.type === "heal") {
                this.totalHeal += healValue;
              } else if (dodge.heal.type === "shield") {
                this.totalShield += healValue;
              }
            }
          }

          for (const skill of data.skill) {
            if (skill.heal && skill.heal.requiredStar <= star && (!skill.heal.ignore || !skill.heal.ignore.includes(star))) {

              const multiplierStat = skill.heal.stat.toLowerCase() === "atk" ? this.ATKCritRatio : this.calculatedHP;
              const healValue = ((skill.heal.multiplier / 100) * multiplierStat * skill.heal.ticks * this.healingBuff) / skill.heal.cooldown;

              if (skill.heal.type === "heal") {
                this.totalHeal += healValue;
              } else if (skill.heal.type === "shield") {
                this.totalShield += healValue;
              }
            }
          }

          for (const discharge of data.discharge) {
            if (discharge.heal && discharge.heal.requiredStar <= star && (!discharge.heal.ignore || !discharge.heal.ignore.includes(star))) {

              const multiplierStat = discharge.heal.stat.toLowerCase() === "atk" ? this.ATKCritRatio : this.calculatedHP;
              const healValue = ((discharge.heal.multiplier / 100) * multiplierStat * discharge.heal.ticks * this.healingBuff) / this.dischargeCooldown;

              if (discharge.heal.type === "heal") {
                this.totalHeal += healValue;
              } else if (discharge.heal.type === "shield") {
                this.totalShield += healValue;
              }
            }
          }

          for (const attack of data.attack) {
            if (attack.heal && attack.heal.requiredStar <= star && (!attack.heal.ignore || !attack.heal.ignore.includes(star))) {

              const multiplierStat = attack.heal.stat.toLowerCase() === "atk" ? this.ATKCritRatio : this.calculatedHP;
              const healValue = ((attack.heal.multiplier / 100) * multiplierStat * attack.heal.ticks * this.healingBuff) / attack.heal.cooldown;

              if (attack.heal.type === "heal") {
                this.totalHeal += healValue;
              } else if (attack.heal.type === "shield") {
                this.totalShield += healValue;
              }
            }
          }

          for (const passive of data.passive) {
            if (passive.heal && passive.heal.requiredStar <= star && (!passive.heal.ignore || !passive.heal.ignore.includes(star))) {

              const multiplierStat = passive.heal.stat.toLowerCase() === "atk" ? this.ATKCritRatio : this.calculatedHP;
              const healValue = ((passive.heal.multiplier / 100) * multiplierStat * passive.heal.ticks * this.healingBuff) / passive.heal.cooldown;

              if (passive.heal.type === "heal") {
                this.totalHeal += healValue;
              } else if (passive.heal.type === "shield") {
                this.totalShield += healValue;
              }
            }
          }
        }
      }
    }

    )
  }


  clearData() {
    this.buffs = [];
    this.professionResonance = [];
    this.elementResonance = [];
    this.buffsSummary = {};
    this.teamBuffsSummary = {};
    this.selfBuffsSummary = {};
    this.teamBuffs = [];
    this.selfBuffs = [];
  }

  logEverything(event: Event) {
    this.errors = new Set<string>();

    // STATS & TITAN

    const stats = {
      hp: this.hpStat ?? 0,
      crit: this.critStat ?? 0,
      critRate: this.critRateStat ?? 0,
      critDmg: this.critDmgStat ?? 0,
      physicalAtk: this.physicalAtkStat ?? 0,
      flameAtk: this.flameAtkStat ?? 0,
      frostAtk: this.frostAtkStat ?? 0,
      voltAtk: this.voltAtkStat ?? 0,

      titanHealing: this.titanHealing ?? 0,
    };

    // UNITS & MATRICES
    const unitValues: Unit[] = [];
    const unitElements = document.querySelectorAll('[data-unit]');

    const selectedUnits = new Set<string>();
    let isUnitErrorAdded = false;

    for (let i = 0; i < unitElements.length; i++) {
      const unitElement = unitElements[i];
      const simulacraSelect = unitElement.querySelector('.simulacra-select');
      const starSelect = unitElement.querySelector('.stars');

      if (simulacraSelect && starSelect) {
        const simulacraValue = simulacraSelect.getAttribute('data-simulacra') || '';
        if (simulacraValue === '' && !isUnitErrorAdded) {
          this.errors.add('Please fill out all the unit fields.');
          isUnitErrorAdded = true;
        } else if (selectedUnits.has(simulacraValue)) { // or if (selectedUnits[simulacraValue])
          this.errors.add(`${simulacraValue[0].toUpperCase() + simulacraValue.slice(1)} has already been selected. Please choose a different unit.`);
          continue; // Skip processing this unit
        }
        selectedUnits.add(simulacraValue);

        const starSelectChildren = starSelect.children;
        let maxAdvancementLevel = -1;
        for (let j = 0; j < starSelectChildren.length; j++) {
          const child = starSelectChildren[j];
          if (child.classList.contains('active')) {
            const advancementLevel = Number(child.getAttribute('data-advancement-level'));
            if (advancementLevel > maxAdvancementLevel) {
              maxAdvancementLevel = advancementLevel;
            }
          }
        }

        const matricesSet = new Map();

        const matrixSelectContainers = unitElement.querySelectorAll('.matrix-select-container');
        for (let j = 0; j < matrixSelectContainers.length; j++) {
          const matrixSelectContainer = matrixSelectContainers[j];
          const matrixSelect = matrixSelectContainer.querySelector('.matrix-select');
          const matrixStars = matrixSelectContainer.querySelector('.stars');

          if (matrixSelect && matrixStars) {
            const matrixValue = matrixSelect.getAttribute('data-matrix') || '';
            if (matrixValue !== '') { // Check if matrixValue is not empty
              const matrixStarsChildren = matrixStars.children;
              let matrixMaxAdvancementLevel = -1;

              for (let k = 0; k < matrixStarsChildren.length; k++) {
                const child = matrixStarsChildren[k];
                if (child.classList.contains('active')) {
                  const advancementLevel = Number(child.getAttribute('data-advancement-level'));
                  if (advancementLevel > matrixMaxAdvancementLevel) {
                    matrixMaxAdvancementLevel = advancementLevel;
                  }
                }
              }

              matricesSet.set(matrixValue, { matrixName: matrixValue, starValue: matrixMaxAdvancementLevel });
            }
          }
        }

        unitValues.push({ simulacraName: simulacraValue, starValue: maxAdvancementLevel, matricesSet });
      }
    }

    console.log("AAAAAAAAA", selectedUnits);

    // TRAIT

    const traitValue = (document.querySelector('.trait-select')?.getAttribute('data-trait') || '').trim();

    // RELICS

    const relicValues: Relic[] = [];
    const relicWrappers = document.querySelectorAll('.relic-wrapper');

    for (let i = 0; i < relicWrappers.length; i++) {
      const relicWrapper = relicWrappers[i];
      const relicSelectContainers = relicWrapper.querySelectorAll('.relic-select-container');
    
      for (let j = 0; j < relicSelectContainers.length; j++) {
        const relicSelectContainer = relicSelectContainers[j];
        const relicSelect = relicSelectContainer.querySelector('.relic-select');
        const stars = relicSelectContainer.querySelector('.stars');
    
        if (relicSelect && stars) {
          const relicName = relicSelect.getAttribute('data-relic') || '';
          if (relicName !== '') {
            const starsChildren = stars.children;
            let maxAdvancementLevel = -1;
      
            for (let k = 0; k < starsChildren.length; k++) {
              const child = starsChildren[k];
              if (child.classList.contains('active')) {
                const advancementLevel = Number(child.getAttribute('data-advancement-level'));
                if (advancementLevel > maxAdvancementLevel) {
                  maxAdvancementLevel = advancementLevel;
                }
              }
            }
            relicValues.push({ relicName, starValue: maxAdvancementLevel });
          }
        }
      }
    }

    // OTHER CONDITIONALS

    if (this.titanHealing > 15) {
      this.errors.add('Titan Healing level cannot be higher than 15.');
    }

    if (Array.from(this.errors).length > 0) { // dont allow the calculator to run if there are errors
      throw new Error(Array.from(this.errors).join('\n'));
    }

    // THE ACTUAL LOGGER

    alert(
      "HP: " + stats.hp + '\n' +
      "Crit: " + stats.crit + '\n' +
      "Crit Rate %: " + stats.critRate + '\n' +
      "Crit DMG %: " + stats.critDmg + '\n' +
      "Physical ATK: " + stats.physicalAtk + '\n' +
      "Flame ATK: " + stats.flameAtk + '\n' +
      "Frost ATK: " + stats.frostAtk + '\n' +
      "Volt ATK: " + stats.voltAtk + '\n' +
      "Increased Healing Level: " + stats.titanHealing + '\n' +
      unitValues.map(unit => {
        const matricesString = Array.from(unit.matricesSet.entries())
          .map(([matrixName, matrix]) => `${matrixName}: ${matrix.starValue}`)
          .join(', ');
        return `${unit.simulacraName}: ${unit.starValue} (Matrices: ${matricesString})`;
      }).join('\n') +
      '\n' +
      "Trait: " + traitValue + '\n' +
      "Relics: " + relicValues.map(relic => `(${relic.relicName}: ${relic.starValue})`).join(', ') +
      '\n'
    );

    this.findProfessionResonance(unitValues);
    this.findElementResonance(unitValues);
    console.log(this.professionResonance, this.elementResonance)
    this.collectResonanceBuffs(unitValues)
    console.log(this.buffs)
    this.collectAllBuffs(unitValues)
    console.log(this.buffs)
    this.collectBuffsSummary()
    this.calculateAttackCritHeal();
    this.calculateHealing(unitValues);
    console.log("heal", this.totalHeal, "shield", this.totalShield)
    this.isButtonPressed = true;
    this.clearData();
  }

  setActiveInfo(event: Event | string | null) {
    if (typeof event === 'string') {
      this.activeInfo = event;
    } else if (event instanceof Event) {
      const target = (event.target as HTMLElement);
      this.activeInfo = target.textContent || ''; // Assuming the text content of the element is the desired information
      const rect = target.getBoundingClientRect();
      const underline = document.querySelector('.underline') as HTMLElement;
      const containerRect = (underline.parentElement as HTMLElement).getBoundingClientRect();
      underline.style.left = `${rect.left - containerRect.left - 8}px`; // offset the width extension
      underline.style.width = `${rect.width + 16}px`; // make it a bit prettier
    }
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement) {
    if (!target.closest('.all-units')) {
      this.showAllUnits = false;
    }
    if (!target.closest('.all-matrices')) {
      this.showAllMatrices = false;
    }
    if (!target.closest('.all-traits')) {
      this.showAllTraits = false;
    }
    if (!target.closest('.all-relics')) {
      this.showAllRelics = false;
    }
  }

  @HostListener('change', ['$event.target'])
  onStatChange(target: HTMLInputElement) {
    console.log(`Changed to ${target.value}`);  // This console logs the stats whenever changed
  }

  @ViewChildren('info') infos!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const underLineInit = new Event('custom');
    Object.defineProperty(underLineInit, 'target', { value: this.infos.first.nativeElement, enumerable: true });
    this.setActiveInfo(underLineInit); // make the underline appear under "Advancements" on page load

    setTimeout(() => {
      $('.underline').css('transition', 'left 0.3s ease, width 0.3s ease');
    }, 1); // shit solution so it doesnt get applied mid-render
  }
}