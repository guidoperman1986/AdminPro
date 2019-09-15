import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
//import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[]=[];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando:boolean = true;

  constructor(public usuarioService:UsuarioService, public modalUploadService:ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUploadService.notificacion.subscribe(res=>this.cargarUsuarios())
  } 

  mostrarModal(id){
    this.modalUploadService.mostrarModal('usuarios',id);
  }

  cargarUsuarios(){
    this.usuarioService.cargarUsuarios(this.desde).subscribe((res:any)=>{
      this.totalRegistros = res.total;
      this.usuarios = res.usuarios;   
      this.cargando = false;   
    })
  }

  cambiarDesde(valor:number){    
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros){
      return;
    }

    if (desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino:string){    
    if (termino != ''){
      this.usuarioService.buscarUsuarios(termino).subscribe((usuarios:Usuario[])=>this.usuarios=usuarios);
    }

    if (termino == ''){
      this.cargarUsuarios();
    }
    
  }

  borrarUsuario(usuario:Usuario){
    console.log(usuario)

    if (usuario._id === this.usuarioService.usuario._id){
      swal("No es posible borrar este usuario",'No es posible borrarse a si mismo','error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta a pundo de borrar a '+ usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(borrar=>{
      if (borrar){
        this.usuarioService.borrarUsuario(usuario._id).subscribe(res=>{
          this.cargarUsuarios()
        })
      }
    })



  }

  guardarUsuario(usuario:Usuario){
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }

}
