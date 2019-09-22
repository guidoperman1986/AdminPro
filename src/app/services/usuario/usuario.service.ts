import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators'
//import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs';

declare var swal:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario:Usuario;
  token:string;
  menu:any [];

  constructor(public http:HttpClient, public router:Router, public subirArchivoService:SubirArchivoService){ 
      this.cargarStorage();
   }

  estaLogueado(){
    return (this.token.length > 5)? true:false;
  }

  cargarStorage(){
    if (localStorage.getItem('token')){
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
        this.token = '';
        this.usuario = null;
        this.menu = null;
    }
  }

  guardarStorage(id:string, token:string, usuario:Usuario, menu:any){
    localStorage.setItem('id', id)
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle(token:string){
    let url = URL_SERVICIOS+'/login/google';    

    return this.http.post(url,{token})
                    .pipe(map((res:any)=>{
                      this.guardarStorage(res.id,res.token,res.usuario, res.menu)

                      return true;
                    }))
  }
  
  login(usuario:Usuario, recordar:boolean= false){
    if (recordar){
      localStorage.setItem('email',usuario.email)
    }else{
      localStorage.removeItem('email');   }

    let url = URL_SERVICIOS+'/login';

    return this.http.post(url,usuario)
                .pipe(map((res:any)=>{                                             
                  this.guardarStorage(res.id,res.token,res.usuario, res.menu);
                  
                  return true;
                }),catchError((error: any) => {
                  swal("Error en el login",error.error.mensaje,"error")
                  return Observable.throw(error.statusText);
                })
              )              
                
  }

  mostrarMensaje(){

  }

  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }
  
  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario'; 
    
    return this.http.post(url, usuario)
               .pipe(map((resp:any)=>{
                  swal('Usuario creado', usuario.email, 'success')
                  return resp.usuario;
                }),catchError((error: any) => {
                  swal(error.error.mensaje,error.error.errors.message,"error")
                  return Observable.throw(error.statusText);
                })
              )
  }

  actualizarUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url+= '?token='+this.token;

    return this.http.put(url,usuario)
                .pipe(map((res:any)=>{                    

                    if (usuario._id === this.usuario._id){ //si yo me actualize a mi mismo
                      this.guardarStorage(res.usuario._id,this.token,res.usuario,this.menu);
                    }

                    swal("Usaurio Actualizado", usuario.nombre, 'success');
                    return true;
                }),catchError((error: any) => {
                  swal(error.error.mensaje,error.error.mensaje,"error")
                  return Observable.throw(error.statusText);
                })
              )

  }

  cambiarImagen(archivo:File, id:string){
    this.subirArchivoService.subirArchivo(archivo,'usuarios',id).then((res:any)=>{
      this.usuario.img = res.usuario.img;
      swal('Imagen Actualizada',this.usuario.nombre,'success');
      this.guardarStorage(id,this.token,this.usuario,this.menu);      
    })
    .catch(error=>{
      console.log(error)
    })
  }

  cargarUsuarios(desde:number=0){
    let url = URL_SERVICIOS + '/usuario' + '?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino:string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
              .pipe(map((res:any)=>res.usuarios))

  }

  borrarUsuario(id:string){
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
                .pipe(map(res=>{
                  swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success')
                  return true;
                })
              )
  }



}
