import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {



  private endPointUrl = `${environment.serverUrl}/clientes`;
  private oHeader: HttpHeaders;

  constructor(private http: HttpClient,
    private authService: AuthenticationService) {
    }


  public list(): Observable<any>{
    this.tokenHeader();
    return this.http.get(this.endPointUrl,{headers: this.oHeader});
  }

  public getById( codigo: string): Observable<any>{
    this.tokenHeader();
    return this.http.get(this.endPointUrl+'/find/'+codigo,{headers: this.oHeader});
  }

  public create(cliente: any){
    this.tokenHeader();
    if (cliente.cli_codigo){
      return this.http.put(this.endPointUrl+'/update',cliente,{headers: this.oHeader}); //actualizacion
    }else{
      return this.http.post(this.endPointUrl+'/create',cliente,{headers: this.oHeader}); //creacion - nuevo
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
