import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutUsCardService {
  private dataUrl = 'assets/json/aboutuscards.json';
  constructor(private http: HttpClient) {}

  getCardData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}
