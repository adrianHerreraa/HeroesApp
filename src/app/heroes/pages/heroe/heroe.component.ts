import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ],
})
export class HeroeComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroesService,
    private router: Router,
  ) {}

  hero!: Heroe;

  ngOnInit(): void {
    // Manera personal
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   this.heroService.getHeroeInfo( id ).subscribe(
    //     (hero) => {
    //       this.hero = hero;
    //     },
    //     (err) => {
    //       console.log('Error del servidor');
    //     }
    //   );
    // });

    // Manera del curso.
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.heroService.getHeroeInfo(id))
    ).subscribe(
      (hero) => this.hero = hero,
    );
  }

  onBack(){
    this.router.navigate(['/heroes/listado']);
  }



}
