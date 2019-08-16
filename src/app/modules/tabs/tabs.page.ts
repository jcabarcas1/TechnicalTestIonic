import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  logout() {

    this.authService.logOut().then(
      auth => {
        this.router.navigate(['/login']);
        alert('You have successfully logged out, you will be redirected to the login screen.');
      }
    );

  }
}
