/* eslint-disable arrow-body-style */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetResult, Storage } from '@capacitor/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  private oHeader: HttpHeaders;
  constructor(private http: HttpClient) {
    this.loadToken();
   }

  getToken(){
     return this.token;
   }

  async loadToken(){
    const token = await Storage.get({key: TOKEN_KEY});
    if (token && token.value){
      console.log('set token:',token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    }else{
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: {username; password}): Observable<any>{
    return this.http.post(`http://localhost:3000/users/login`,credentials).pipe(
      map((data: any) =>data.token),
      switchMap(token =>{
        this.token =token;
        return from(Storage.set({key: TOKEN_KEY, value: token}));
      }),
      tap(_ =>{
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): Promise<void>{
    const oHeader = new HttpHeaders();
    this.oHeader= oHeader.set('Authorization',this.token);
    this.token='';
    this.http.get(`http://localhost:3000/users/logout`,{headers:this.oHeader}).subscribe(data => {});
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
