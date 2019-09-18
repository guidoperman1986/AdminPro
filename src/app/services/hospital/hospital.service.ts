import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

declare var swal:any;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  token:string;

  constructor(public http:HttpClient, public usuarioService:UsuarioService) {    
  }

  ngOnInit() {  }

  crearHospital(nombre:string){
    let url = URL_SERVICIOS + "/hospital";
    url+='?token='+this.usuarioService.token;
    
    return this.http.post(url,{nombre})
                .pipe(map(res=>{
                    swal('Hospital creado', 'El Hospital '+ nombre +' ha sido eliminado correctamente', 'success')
                    return true;
                })
    )
  }

  cargarHospitales(){
    let url = URL_SERVICIOS + '/hospital'

    return this.http.get(url)
                .pipe(map((res:any)=>res.hospitales))
  }

  obtenerHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
                .pipe(map((res:any)=>{
                  //console.log(res)
                  return res.hospital
                }))
  }

  borrarHospital(id){
    let url = URL_SERVICIOS + '/hospital/'+ id;
    
    url+='?token='+this.usuarioService.token;   

    return this.http.delete(url)
              .pipe(map(res=>{
                  console.log(res);
                  swal('Hospital borrado', 'El Hospital ha sido eliminado correctamente', 'success')
                  return true;
                })
              )
  }

  actualizarHospital(hospital:Hospital){
    let url=URL_SERVICIOS + '/hospital/' + hospital._id
    url+='?token='+this.usuarioService.token;    

    return this.http.put(url,hospital)
             .pipe(map(res=>{
                swal('Hospital actualizado', 'El Hospital ha sido actualizado correctamente', 'success')
                return true;
             }))

  }

  buscarHospital(termino:string){
    let url=URL_SERVICIOS + '/busqueda/coleccion/hospitales/'+termino;

    return this.http.get(url)
               .pipe(map((res:any)=>res.hospitales));
  }

  



}
