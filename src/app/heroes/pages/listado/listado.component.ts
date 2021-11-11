import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {


  heroesList: Heroe[] = [];

  constructor( private hService: HeroesService ) { }

  ngOnInit(): void {
    this.hService.getHeroes().subscribe(
      (heroes) => {
        this.heroesList = heroes;
      },
      (err) => {
        console.log('Error del servidor');
      }
    );
  }



}
