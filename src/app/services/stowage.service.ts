import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StowageService {
  private urlBase = environment.urlBase;  
  constructor(private http: HttpClient) { }

  getStowageData() {
    return this.http.get(`${this.urlBase.apiabc}/api/stowage`);
  }

}