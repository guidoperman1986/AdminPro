import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email:string;
  auth2:any;

  constructor(public router:Router, public usuarioService:UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1){
      this.recuerdame = true
    }
  }

  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '636964061680-d7jjo1613gmsf1d7p8qeddcgqqa8ba95.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      })

      this.attachSignIn(document.getElementById('btnGoogle'))


    })
  }

  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser)=>{
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle(token).subscribe(res=>{
        window.location.href = '#/dashboard';
      })
      //console.log(token)
    })
  }

  ingresar(forma:NgForm){

    if (forma.invalid){
      return;
    }
    let usuario = new Usuario(null,forma.value.email,forma.value.password)

    this.usuarioService.login(usuario,forma.value.recuerdame).subscribe(loginCorrecto=>window.location.href = '#/dashboard')
    
  }

}
