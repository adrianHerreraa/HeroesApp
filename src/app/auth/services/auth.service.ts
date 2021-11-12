import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrlStg;
  private _auth: Auth | undefined;

  get auth(): Auth{
    return { ...this._auth! };
  }

  constructor( 
    private _http: HttpClient 
  ) { }

  authVerify(): Observable<boolean> {
    
    if( !localStorage.getItem('token') ){
      return of(false);
    }

    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
      .pipe(
        map (
          (auth) => {
            this._auth = auth;
            return true;
          },
        ),
      );
  }

  login(): Observable<Auth>{
    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
      .pipe(
        tap(
          (auth) => {
            this._auth = auth;
            localStorage.setItem('token', auth.id);
          }
        ),
      );
  }

  logOut(){
    this._auth = undefined;
  }


}
