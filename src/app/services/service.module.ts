import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,SidebardService,SharedService } from './sevice.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { SubirArchivoService } from './subirArchivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';

import { LoginGuardGuard } from './guards/login-guard.guard';
import { AdminGuard } from './guards/admin.guard';
import { VerificaTokenGuard } from './guards/verifica-token.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,     
    HttpClientModule
  ],
  providers:[
    SettingsService,
    SidebardService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
