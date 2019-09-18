import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/sevice.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  cargando:boolean;
  totalRegistros:number;
  hospitales:Hospital[]=[]
  desde:number;

  constructor(public hospitalService:HospitalService, public modalUploadService:ModalUploadService) {
      this.cargarHospitales();
      
  }

  ngOnInit() {
    this.modalUploadService.notificacion.subscribe(res=>this.cargarHospitales());
  }

  crearHospital(nombre:string){
    this.hospitalService.crearHospital(nombre).subscribe(res=>{
      console.log(res)
      this.cargarHospitales();
    })
  }

  buscarHospital(valor:string){
    if (valor === ''){
      this.cargarHospitales();
      return;
    }

    this.hospitalService.buscarHospital(valor).subscribe(res=>{      
      this.totalRegistros = res.length;
      this.hospitales = res;
    });
  }

  guardarHospital(hospital:Hospital){    
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital:Hospital){    
    swal({
      title: 'Esta seguro?',
      text: 'Esta a pundo de borrar a '+ hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(borrar=>{
      if (borrar){
        this.hospitalService.borrarHospital(hospital._id).subscribe(res=>{
          this.cargarHospitales()
        })
      }
    })
  }

  mostrarSweet(){
    swal("Crear nuevo hospital", {
      title: "Crear Hospital",
      text: "Ingrese el nombre del hospital",
      content: "input",
      icon: 'info',
      buttons: true,
      dangerMode: true
        
    })
    .then((value) => {
        if(`${value}`){
          this.hospitalService.crearHospital(value)
              .subscribe(res=>{      
                    this.cargarHospitales();
              })
        }else{
          console.log("no");
        }
    });

  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe((res:any)=>{        
      this.totalRegistros = res.length;
      this.hospitales = res;      
      console.log(res);
    })
  }

  mostrarModal(id:string){
    this.modalUploadService.mostrarModal('hospitales',id)
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
    this.cargarHospitales();
  }

}
