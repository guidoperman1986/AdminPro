import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  //@Input('nombre') leyenda: string = "Leyenda 1"; 'nombre sirve para renombrar del lado de afuera'
  @Input() leyenda: string = "Leyenda 1";
  @Input() progreso:number = 50;

  @Output() progresoEmit:EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress', null) txtProgress:ElementRef;

  constructor() { 
    console.log('Leyenda: ', this.leyenda)      
  }
  
  ngOnInit() {
    console.log('Progreso: ', this.progreso);
  }  

  onChanges(newValue){       
    if (newValue >= 100){
      this.progreso = 100;
    }else if(newValue <= 0){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value = this.progreso;

    this.progresoEmit.emit(this.progreso)
    
  }

  cambiarValor(valor){

    if (this.progreso == 100){
      this.progreso = 95;
    }

    if (this.progreso <= 0){
      this.progreso = 0;
    }

    this.progreso = this.progreso + valor;

    this.progresoEmit.emit(this.progreso)

    this.txtProgress.nativeElement.focus()
  }

}
