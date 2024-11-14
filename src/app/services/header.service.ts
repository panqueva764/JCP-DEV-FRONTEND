import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = 'https://dfa48947-0068-492b-a1c1-a256ee4ce793.mock.pstmn.io/api/api-response';

  constructor(private http: HttpClient) {}

  getHeaderData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
