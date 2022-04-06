import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private endPointUrl = `${environment.serverUrl}/empleados`;

  constructor(private http: HttpClient) { }


  public list(): Observable<any>{
    return this.http.get(this.endPointUrl);
  }

  public getById( codigo: string): Observable<any>{
    return this.http.get(this.endPointUrl+'/find/'+codigo);
  }

  public create(empleado: any){
    if (empleado.emp_codigo){
      return this.http.put(this.endPointUrl+'/update',empleado); //actualizacion
    }else{
      return this.http.post(this.endPointUrl+'/create',empleado); //creacion - nuevo
    }
  }

  public delete(codigo){
    return this.http.delete(this.endPointUrl+'/remove/'+codigo);
  }
}
