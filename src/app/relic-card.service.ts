import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class RelicCardService {
  private dataUrl = 'assets/json/relics-data.json'; // Update the path
  constructor(private http: HttpClient) {}

  getCardData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}
