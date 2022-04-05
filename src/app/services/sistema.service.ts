import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  private endPointUrl = `${environment.serverUrl}/sistemas`;

  constructor(private http: HttpClient) { }


  public list(): Observable<any>{
    return this.http.get(this.endPointUrl);
  }

  public getById( codigo: string): Observable<any>{
    return this.http.get(this.endPointUrl+'/find/'+codigo);
  }

  public create(sistema: any){
    if (sistema.sis_codigo){
      return this.http.put(this.endPointUrl+'/update',sistema); //actualizacion
    }else{
      return this.http.post(this.endPointUrl+'/create',sistema); //creacion - nuevo
    }
  }

  // public delete(codigo){
  //   return this.http.delete(this.endPointUrl+'/remove/'+codigo);
  // }
}
