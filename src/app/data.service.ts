import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getSimulacraData(): Observable<any> {
    return this.http.get('assets/json/simulacra-data.json');
  }

  getMatricesData(): Observable<any> {
    return this.http.get('assets/json/matrices-data.json');
  }

  getRelicsData(): Observable<any> {
    return this.http.get('assets/json/relics-data.json');
  }

  getGlossaryData(): Observable<any> {
    return this.http.get('assets/json/glossary-data.json');
  }

  getAboutUsData(): Observable<any> {
    return this.http.get('assets/json/about-us-data.json');
  }

  getWeaponMaterialsData(): Observable<any> {
    return this.http.get('assets/json/weapon-materials-data.json');
  }
}
