import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/sevice.index';
import { HospitalService } from '../../services/sevice.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[]=[]
  medico:Medico = new Medico('','','','');
  hospital:Hospital = new Hospital('');

  constructor(public medicoService:MedicoService,public hospitalService:HospitalService, public router:Router, ar:ActivatedRoute,public modalUploadService:ModalUploadService) {
    ar.params.subscribe(params=>{
      let id = params['id'];

      if (id != 'nuevo'){
        this.cargarMedico(id);
      }
    })
   }

  ngOnInit() {
    this.hospitalService.cargarHospitales().subscribe(hospitales=>{
      this.hospitales = hospitales;
    })

    this.modalUploadService.notificacion.subscribe(res=>{      
      this.medico.img = res.medico.img;
    })
  }

  guardarMedico(forma:NgForm){
    if (forma.invalid){
      return;
    }

    this.medicoService.guardarMedico(this.medico).subscribe(medico=>{      
      this.medico = medico;
      this.router.navigate(['/medico', medico._id])
    })    
  }

  cargarMedico(id:string){
    this.medicoService.cargarMedico(id).subscribe(medico=>{      
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    })
  }

  cambioHospital(id){        
    this.hospitalService.obtenerHospital(id).subscribe((hospital:any)=>{            
      this.hospital=hospital;

    })    
  }

  cambiarFotografia(){
    this.modalUploadService.mostrarModal('medicos',this.medico._id);
  }

}
