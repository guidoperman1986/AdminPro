import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebardService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu:[
        {titulo:'Dashboard', url:'/dashboard'},
        {titulo:'ProgressBar', url:'/progress'},
        {titulo:'Graficas', url:'/graficas1'},
        {titulo:'Promesas', url:'/promesas'},
        {titulo:'RXJS', url:'/rxjs'},
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Usuario', url:'/usuarios'},
        {titulo:'Hospitales', url:'/hospitales'},
        {titulo:'Medicos', url:'/medicos'},        
      ]
    }

  ]

  constructor() { }
}
