import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private _router: Router,
  ){}
  
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): | Observable<boolean> | Promise<boolean> | boolean {
    
    return this.authService.authVerify()
      .pipe(
        tap (
          (isAuth) => {
            if( !isAuth ){
              this._router.navigate(['./auth/login']);
            }
          },
        ),
      );

    /*if( this.authService.auth.id ){
      return true;
    }

    console.log('Bloqueado por AdGuard - CanActivate');
    return false; */
  }
  
  canLoad( route: Route, segments: UrlSegment[] ): | Observable<boolean> | Promise<boolean> | boolean {

    /*console.log('canLoad', true);
    console.log( route );
    console.log( segments );*/

    return this.authService.authVerify()
      .pipe(
        tap (
          (isAuth) => {
            if( !isAuth ){
              this._router.navigate(['./auth/login']);
            }
          },
        ),
      );

    /*if( this.authService.auth.id ){
      return true;
    }

    console.log('Bloqueado por AdGuard - CanLoad');
    return false;*/
  }
}
