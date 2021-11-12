import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'dc_comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'marvel_comics',
    },
  ];

  hero: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    alt_img: '',
  };

  constructor(
    private hService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.hService.getHeroeInfo(id)))
      .subscribe((hero) => {
        this.hero = hero;
      });
  }

  saveHero() {

    if (this.hero.superhero.trim().length === 0) {
      return;
    }

    if( this.hero.id ){
      // Editar / Actualizar.
      this.hService.actualizarHeroe(this.hero).subscribe(
        (hero) => {
          console.log('Actualizando: ' + hero);
        },
        (err) => {
          console.log('Error en el servidor, ' + err);
        }
      );
    }else{
      // Agregar Nuevo.
      this.hService.agregarHeroe(this.hero).subscribe(
        (heroResp) => {
          this.router.navigate(['/heroes/editar', heroResp.id]);
        },
        (err) => {
          console.log('Error en el servidor: ' + err);
        }
      );
    }

  }
}
