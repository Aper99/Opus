import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private endPointUrl = `${environment.serverUrl}/tareas`;

  constructor(private http: HttpClient) { }


  public list(estado?: string): Observable<any>{
    let oParams = new HttpParams();
    if (estado){
      oParams =oParams.set('estado',estado);
    }
    console.log(oParams);

    return this.http.get(this.endPointUrl,{params: oParams});
  }

  public getById( codigo: string): Observable<any>{
    return this.http.get(this.endPointUrl+'/find/'+codigo);
  }

  public create(tarea: any){
    if (tarea.tra_numero){
      return this.http.put(this.endPointUrl+'/update',tarea); //actualizacion
    }else{
      return this.http.post(this.endPointUrl+'/create',tarea); //creacion - nuevo
    }
  }

  public delete(codigo){
    return this.http.delete(this.endPointUrl+'/remove/'+codigo);
  }

}
