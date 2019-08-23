import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/sevice.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, public ajustes:SettingsService) { 
  }
  
  ngOnInit() {
    this.colocarCheck()
  }

  cambiarColor(tema:string, link:any){
    this.aplicarCheck(link)

    /* let url = `assets/css/colors/${tema}.css` */
    /* this._document.getElementById('tema').setAttribute('href',url) */
/*  */
    /* this.ajustes.ajustes.tema = tema; */
    /* this.ajustes.ajustes.temaUrl = url; */
/*  */
    /* this.ajustes.guardarAjustes(); */

    this.ajustes.aplicarTema(tema)    
  }

  aplicarCheck(link:any){
    let selectores:any = document.getElementsByClassName('selector');    

    for(let ref of selectores){
        ref.classList.remove('working');
    }

    link.classList.add('working')
  }

  colocarCheck(){
    let selectores:any = document.getElementsByClassName('selector');
    let tema = this.ajustes.ajustes.tema;    

    for(let ref of selectores){
      if (ref.getAttribute('data-theme') === tema){
        ref.classList.add('working');
        break;
      }
    }
  }
}
