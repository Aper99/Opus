import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private endPointUrl = `${environment.serverUrl}/users`;

  private oHeader: HttpHeaders;

  constructor(private http: HttpClient,
    private authService: AuthenticationService) {
    }


  public list(): Observable<any>{
    this.tokenHeader();
    return this.http.get(this.endPointUrl,{headers: this.oHeader});
  }

  public getById( codigo: string | number): Observable<any>{
    this.tokenHeader();
    return this.http.get(this.endPointUrl+'/find/'+codigo,{headers: this.oHeader});
  }

  public create(usuario: any){
    this.tokenHeader();
    if (usuario.id){
      return this.http.put(this.endPointUrl+'/update',usuario,{headers: this.oHeader}); //actualizacion
    }else{
      return this.http.post(this.endPointUrl+'/create',usuario,{headers: this.oHeader}); //creacion - nuevo
    }
  }

  public delete(codigo){
    this.tokenHeader();
    return this.http.delete(this.endPointUrl+'/remove/'+codigo,{headers: this.oHeader});
  }

  private tokenHeader(){
    const oHeader = new HttpHeaders();
    const token = this.authService.getToken();
    this.oHeader = oHeader.append('Authorization',token);

  }

}
