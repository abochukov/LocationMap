import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private statusUrl = '/api/status';
  public stat;

  constructor(private http: HttpClient) { }

  getStatus() {
     this.http.get(this.statusUrl).subscribe(status => {
      this.stat = status;
      console.log(this.stat);
    });           
  }

  getPopulationDensity() {
    return this.http.get('/api/population');
  }

  getUrbanExpansion() {
    return this.http.get('/api/expansion');
  }
}
