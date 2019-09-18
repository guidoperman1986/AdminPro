import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { Router } from '@angular/router';

declare var swal:any;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number=0;
  constructor(public http:HttpClient, public usuarioService:UsuarioService) { }

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
              .pipe(map((res:any)=>{                
                this.totalMedicos = res.total;
                return res.medicos;
              }))
  }

  buscarMedicos(termino:string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
              .pipe(map((res:any)=>res.medicos))

  }

  borrarMedico(id){
    let url = URL_SERVICIOS + '/medico/'+ id;
    
    url+='?token='+this.usuarioService.token;    
    
    return this.http.delete(url)
              .pipe(map(res=>{                  
                  swal('Medico borrado', 'El medico ha sido eliminado correctamente', 'success')
                  return true;
                })
              )
  }

  cargarMedico(id:string){
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
                .pipe(map((res:any)=>res.medico))
  }

  guardarMedico(medico:Medico){
    let url = URL_SERVICIOS + '/medico';
    
    if (medico._id){
      //actualizar
      url += '/'+medico._id;
      url+= '?token='+this.usuarioService.token;
      return this.http.put(url,medico)
                .pipe(map((res:any)=>{
                  swal('Medico actualizado', medico.nombre, 'success');
                  return res.medico;    
                }))
    }else{
      //crear
      url+= '?token='+this.usuarioService.token;
      return this.http.post(url,medico)
              .pipe(map((res:any)=>{
                swal('Medico creado', medico.nombre, 'success');
                return res.medico;
              }))            
    }   

  }
}
