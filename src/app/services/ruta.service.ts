import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private endPointUrl = `${environment.serverUrl}/rutas`;

  constructor(private http: HttpClient) { }


  public list(): Observable<any>{
    return this.http.get(this.endPointUrl);
  }

  public listGroup(): Observable<any>{
    return this.http.get(this.endPointUrl+'/group');
  }

  public getById( codigo: string): Observable<any>{
    return this.http.get(this.endPointUrl+'/find/'+codigo);
  }

  public create(ruta: any){
    if (ruta.rut_codigo){
      return this.http.put(this.endPointUrl+'/update',ruta); //actualizacion
    }else{
      return this.http.post(this.endPointUrl+'/create',ruta); //creacion - nuevo
    }
  }

  public delete(codigo){
    return this.http.delete(this.endPointUrl+'/remove/'+codigo);
  }
}
