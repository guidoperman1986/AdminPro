import { Component, OnInit } from '@angular/core';
import { SidebardService } from '../../services/sevice.index';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public sidebar:SidebardService, public usuarioService:UsuarioService) { }

  ngOnInit() {
  }

}
