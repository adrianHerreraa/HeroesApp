import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 50%;
        border-radius: 5px;
      }
    `,
  ],
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
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

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

    if (this.hero.id) {
      // Editar / Actualizar.
      this.hService.actualizarHeroe(this.hero).subscribe(
        (hero) => {
          console.log('Actualizando: ' + hero);
          this.mostrarSnackbar('Registro actualizado.');
        },
        (err) => {
          console.log('Error en el servidor, ' + err);
        }
      );
    } else {
      // Agregar Nuevo.
      this.hService.agregarHeroe(this.hero).subscribe(
        (heroResp) => {
          this.mostrarSnackbar('Registro creado correctamente.');
          this.router.navigate(['/heroes/editar', heroResp.id]);
        },
        (err) => {
          console.log('Error en el servidor: ' + err);
        }
      );
    }
  }

  deleteHero() {
    const dialog = this._dialog.open(ConfirmarComponent, {
      width: '25%',
      data: this.hero,
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.hService.eliminarHero(this.hero.id!).subscribe(
            (resp) => {
              this.router.navigate(['/heroes']);
            },
            (err) => {
              console.log('Error en el servicio: ' + err);
            }
          );
        }
      },
      (err) => {
        console.log('Error en el servicio: ' + err);
      }
    );
  }

  mostrarSnackbar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Ok!', {
      duration: 2500,
    });
  }
}
