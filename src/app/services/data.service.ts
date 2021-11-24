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

  // Error handling
  private error (error: any) {
    let message = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}
