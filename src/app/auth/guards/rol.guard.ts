import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles:string[] = route.data['role'];
    const userRole = this.auth.getUserRole();

    // if (userRole !== expectedRole) {
    //   this.router.navigate(['/unauthorized']);
    //   return false;
    // }
    // return true;

    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (Array.isArray(expectedRoles) && expectedRoles.includes(userRole)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
