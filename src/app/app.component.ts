import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'webFinal';
  isScrolled = false;
  _rol = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    // this.loadInitialUser();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // this.fetchUser();
        this._rol = this.authService.getUserRole() ?? '';
      }
    });
  }

  // loadInitialUser() {
  //   const role = this.authService.getUserRole();
  //   if (role) {
  //     this._rol = role;
  //   }
  // }

  // fetchUser() {
  //   this.authService.getUserFromServer().subscribe({
  //     next: user => {
  //       this._rol = user.role;
  //       console.log('User data refreshed:', user);
  //     },
  //     error: err => {
  //       console.error('Error fetching user data:', err);
  //     }
  //   });
  // }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  cerrarSesion(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
