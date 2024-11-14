import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://dfa48947-0068-492b-a1c1-a256ee4ce793.mock.pstmn.io';

  constructor(private http: HttpClient) { }
  
  getTitlesData(): Observable<any> {
    const url = `${this.baseUrl}/api/titles`;
    return this.http.get<any>(url);
  }

  getProjectsData(): Observable<any> {
    const url = `${this.baseUrl}/api/projects`;
    return this.http.get<any>(url);
  }

  getExperiencesData(): Observable<any> {
    const url = `${this.baseUrl}/api/experiences`;
    return this.http.get<any>(url);
  }

  getCertificatesData(): Observable<any> {
    const url = `${this.baseUrl}/api/certificates`;
    return this.http.get<any>(url);
  }

  getInfoData(): Observable<any> {
    const url = `${this.baseUrl}/api/api-response`;
    return this.http.get<any>(url);
  }
}