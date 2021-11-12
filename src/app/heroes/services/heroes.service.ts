import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrlStg;

  constructor( private http: HttpClient ) { }


  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroeInfo( id: string ): Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  getSugerencias( termino: string ): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=5`);
  }

  agregarHeroe( hero: Heroe ): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, hero);
  }

  actualizarHeroe( hero: Heroe ): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  eliminarHero( id: string ): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  }


}
