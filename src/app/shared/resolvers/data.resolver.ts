import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataService } from 'src/app/data.service';

export const DataResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const dataService = inject(DataService);

  return forkJoin({
    simulacra: dataService.getSimulacraData(),
    matrices: dataService.getMatricesData(),
    relics: dataService.getRelicsData(),
    glossary: dataService.getGlossaryData(),
    aboutUs: dataService.getAboutUsData(),
    weaponMaterials: dataService.getWeaponMaterialsData()
  });
}