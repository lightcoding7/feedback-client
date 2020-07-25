import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  private baseUrl = 'http://localhost:8181/api/v1/';

  constructor(private http:HttpClient) { }



  createFeedback(feedback: object): Observable<object> {

    return this.http.post(`${this.baseUrl}`+'addFeedback', feedback, {
      headers: new HttpHeaders({
        'x-client-id':'tcs',
        'x-client-key':'feedback_yamini'
      })
    });
  }

  deleteFeedback(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}feedback/${id}`, { responseType: 'text' });
  }

  getFeedbackList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'feedbacks');
  }
  getFeedback(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}feedbacks/${id}`);
  }
  updateFeedback(id: string, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}feedback/${id}`, value);
  }

}
