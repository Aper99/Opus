import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private endPointUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) { }


  public list(): Observable<any>{
    return this.http.get(this.endPointUrl);
  }

  public getById( codigo: string): Observable<any>{
    return this.http.get(this.endPointUrl+'/find/'+codigo);
  }

  public create(cliente: any){
    if (cliente.cli_codigo){
      return this.http.put(this.endPointUrl+'/update',cliente); //actualizacion
    }else{
      return this.http.post(this.endPointUrl+'/create',cliente); //creacion - nuevo
    }
  }


}
