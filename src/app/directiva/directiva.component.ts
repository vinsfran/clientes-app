import {Component} from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];
  habilitar: boolean = true;
  titleButton: string = 'Ocultar';

  constructor() {
  }

  setHabilitar(): void {
    // this.habilitar = (this.habilitar == true) ? false : true;
    if (this.habilitar) {
      this.habilitar = false;
      this.titleButton = 'Ocultar';
    } else {
      this.habilitar = true;
      this.titleButton = 'Mostrar';
    }
  }
}
