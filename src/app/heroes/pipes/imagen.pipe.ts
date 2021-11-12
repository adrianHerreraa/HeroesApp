import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  // pure: false,
})
export class ImagenPipe implements PipeTransform {

  transform( hero: Heroe ): string {
    if(!hero.id){
      return 'assets/no-image.png';
    }else if(hero.alt_img){
      return hero.alt_img;
    }else{
      return `assets/heroes/${hero.id}.jpg`;
    }
  }

}
