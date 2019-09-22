import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {  
  imagenSubir:File;
  imagenTemp:string;

  constructor(public subirArchivo:SubirArchivoService, public modalUploadService:ModalUploadService) {
    
   }

  ngOnInit() {
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

  subirImagen(){
    this.subirArchivo.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
                    .then(res=>{
                        console.log(res);
                        this.modalUploadService.notificacion.emit(res);
                        //this.modalUploadService.ocultarModal();
                        this.cerrarModal();
                    })
                    .catch(error=>{

                    })
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }

}
