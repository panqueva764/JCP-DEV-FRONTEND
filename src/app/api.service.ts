// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://jcp-dev-backend-18b251ea1c4a.herokuapp.com';

  constructor(private http: HttpClient, private router: Router) { }
  
  navigateTo(key: string): void {
    const url = `${this.baseUrl}/api/${key}`;
    this.getResponse(url).subscribe((data: any) => {
      // Aquí puedes manejar la respuesta como desees
      console.log(`Respuesta para ${key}:`, data);
    });
  }

  private getResponse(url: string) {
    return this.http.get<any>(url);
  }
}
