import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from 'src/app/interfaces/areaInterface';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private apiUrl = 'http://localhost:5000/api/areas';

  constructor(private http: HttpClient) {}
  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }

  addArea(Area: Area): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, Area);
  }

  updateArea(id: number, Area: Area): Observable<Area> {
    return this.http.put<Area>(`${this.apiUrl}/${id}`, Area);
  }

  deleteArea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
