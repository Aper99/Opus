import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private endPointUrl = `${environment.serverUrl}/tareas`;
  private oHeader: HttpHeaders;

  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }


  public list(estado?: string, usuario?: string): Observable<any>{
    this.tokenHeader();
    let oParams = new HttpParams();
    if (estado){
      oParams =oParams.append('estado',estado);
    }
    if (usuario){
      oParams =oParams.append('usuario',usuario);
    }

    return this.http.get(this.endPointUrl,{params: oParams,headers: this.oHeader});
  }

  public getById( codigo: string): Observable<any>{
    this.tokenHeader();
    return this.http.get(this.endPointUrl+'/find/'+codigo,{headers: this.oHeader});
  }

  public create(tarea: any){
    this.tokenHeader();
    if (tarea.tra_numero){
      return this.http.put(this.endPointUrl+'/update',tarea,{headers: this.oHeader}); //actualizacion
    }else{
      return this.http.post(this.endPointUrl+'/create',tarea,{headers: this.oHeader}); //creacion - nuevo
    }
  }

  public delete(codigo){
    this.tokenHeader();
    return this.http.delete(this.endPointUrl+'/remove/'+codigo,{headers: this.oHeader});
  }

  private tokenHeader(){
    const oHeader = new HttpHeaders();
    const token =  this.authService.getToken();
    this.oHeader = oHeader.append('Authorization',token);

  }


}
