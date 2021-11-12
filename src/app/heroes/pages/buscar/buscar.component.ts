import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = "";
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor( private hService: HeroesService ) { }

  ngOnInit(): void {
  }

  buscando(){
    this.hService.getSugerencias( this.termino.trim() ).subscribe(
      (heroes) => {
        this.heroes = heroes
      },
      (err) => {
        console.log('Ah ocurrido un error: ' + err);
      }
    );
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ){

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }
    
    const data: Heroe = event.option.value;
    this.termino = data.superhero;

    this.hService.getHeroeInfo(data.id!).subscribe(
      (heroResp) => {
        this.heroeSeleccionado = heroResp;
      },
      (err) => {
        console.log('Error con el servidor: ' + err);
      }
    );

  }

}
