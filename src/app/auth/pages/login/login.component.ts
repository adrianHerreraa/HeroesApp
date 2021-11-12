import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(private _router: Router, private _authService: AuthService) {}

  login() {
    // 1.-
    // Ir al backend.
    this._authService.login().subscribe(
      (resp) => {
        if (resp.id) {
          // Navegar a la ruta hija.
          this._router.navigate(['./heroes']);
        }
        console.log(resp);
      },
      (err) => {
        console.log('Error en Auth: ' + err);
      }
    );
    // Obtener un usuario existente.
  }
}
