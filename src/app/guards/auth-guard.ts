import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Auth } from "../services/auth";

@Injectable({ providedIn: 'root' })

export class authGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {

  }

  canActivate(): boolean {
    if (!this.auth.getAuth()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
