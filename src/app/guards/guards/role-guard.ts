import { Injectable } from "@angular/core";
import { CanActivate, Router,ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../services/auth-service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route:ActivatedRouteSnapshot):boolean{
    const expectedRole: string[] = route.data['roles'];
    const token=localStorage.getItem('token');
    const userRole=this.authService.getUserRole();
    if(!token){
      this.router.navigate(['/login']);
      return false;
    }
    if (this.authService.isLoggedIn() && expectedRole.includes(userRole!)) {
      return true;
  }

this.router.navigate(['/unauthorized']);
return false;
  }
}