import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,SidebardService,SharedService } from './sevice.index';
import { UsuarioService } from './usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './subirArchivo/subir-archivo.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,     
    HttpClientModule
  ],
  providers:[
    SettingsService,SidebardService,SharedService,UsuarioService,LoginGuardGuard,SubirArchivoService
  ]
})
export class ServiceModule { }
