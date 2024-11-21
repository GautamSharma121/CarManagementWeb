import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarModelService {
  private apiUrl='';
  private  baseUrl='https://localhost:7235/';

  constructor(private http: HttpClient) {}

  // Method to get car models
  getCarModels(): Observable<any> {
    this.apiUrl=this.baseUrl+"api/MasterData/brands"
    return this.http.get<any>(this.apiUrl);
  }
}
