import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

declare var swal:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario:Usuario
  imagenSubir:File;
  imagenTemp:string;

  constructor(public usuarioService:UsuarioService) { 
    this.usuario = usuarioService.usuario;

  }

  ngOnInit() {
  }

  guardar(usuario:Usuario){
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google){
      this.usuario.email = usuario.email;
    }

    this.usuarioService.actualizarUsuario(this.usuario).subscribe(res=>{
      console.log(res)
    })
  }

  seleccionImagen(archivo:File){
    if (!archivo){
      this.imagenSubir = null
      return;
    }

    if (archivo.type.indexOf('image')<0){
      swal('Solo se admiten imagenes','error');
      this.imagenSubir=null;
    }

    this.imagenSubir = archivo;
    console.log(archivo)

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    //reader.onloadend = ()=> this.imagenTemp = reader.result
  }

  cambiarImagen(){
    this.usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
  }

}
