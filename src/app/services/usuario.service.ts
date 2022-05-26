import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private endPointUrl = `${environment.serverUrl}/users`;

  constructor(private http: HttpClient) { }


  public list(): Observable<any>{
    return this.http.get(this.endPointUrl);
  }

  public getById( codigo: string): Observable<any>{
    return this.http.get(this.endPointUrl+'/find/'+codigo);
  }

  public create(usuario: any){
    if (usuario.id){
      return this.http.put(this.endPointUrl+'/update',usuario); //actualizacion
    }else{
      return this.http.post(this.endPointUrl+'/create',usuario); //creacion - nuevo
    }
  }

  public delete(codigo){
    return this.http.delete(this.endPointUrl+'/remove/'+codigo);
  }
}
