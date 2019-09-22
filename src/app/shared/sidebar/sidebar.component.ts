import { Component, OnInit } from '@angular/core';
import { SidebardService } from '../../services/sevice.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario:Usuario;

  constructor(public sidebar:SidebardService, public usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.sidebar.cargarMenu();
  }

}
