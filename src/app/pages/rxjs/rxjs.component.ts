import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry,map,filter } from 'rxjs/operators';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {
  suscripcion: Subscription;

  constructor() { 
                                                           
    this.suscripcion = this.regresaObservable()
    //.pipe(
    //  retry(2)
    //)    
    .subscribe(
      numero => console.log('Subs ',numero),
      error => console.error("Error ", error),
      ()=> console.log("El observador termino")
    )

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  regresaObservable():Observable<any>{
    return new Observable(observer=>{//el tipo de observer es subscriber
      let contador = 0;

      let interval = setInterval(()=>{
        contador += 1;

        const salida = {
          valor:contador
        }

        observer.next(salida);
        //if (contador === 3){
        //  clearInterval(interval)          
        //  observer.complete()
      //    observer.unsubscribe();
        //}
        //if (contador === 2){
        //  /* clearInterval(interval) */
        //  observer.error('Auxilio')
        //}
      },1000)
    }).pipe(
      map((res:any)=>res.valor),
      filter((valor, index)=>{//si o si debe regresar un true o false
          if ((valor%2) === 1){
            return true;
          }else{
            return false;
          }
      })      
    )
  }
}
