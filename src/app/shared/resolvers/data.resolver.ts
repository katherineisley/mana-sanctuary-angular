import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataService } from 'src/app/data.service';

export const DataResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const http = inject(HttpClient);
  const dataService = inject(DataService);

  // this is nonfunctional atm

  return forkJoin([
    dataService.getSimulacraData(),
    dataService.getMatricesData(),
    dataService.getRelicsData(),
    dataService.getGlossaryData(),
    dataService.getAboutUsData(),
  ]);
}