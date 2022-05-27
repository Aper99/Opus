import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public user = null;
  private helper = new JwtHelperService();

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }
  abrir(){
    const decodedToken = this.helper.decodeToken(this.authService.getToken());
    this.user = decodedToken;
  }

  async logout(){
    await this.authService.logout();
    this.router.navigate(['/']);
  }

}
