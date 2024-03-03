import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = 'https://jcp-dev-backend-18b251ea1c4a.herokuapp.com/api/api-response';

  constructor(private http: HttpClient) {}

  getHeaderData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
