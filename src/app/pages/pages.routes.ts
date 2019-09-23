import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { AdminGuard, VerificaTokenGuard } from '../services/sevice.index';

const pagesRoutes: Routes = [    
        { path:'dashboard', component:DashboardComponent, data:{titulo:'Dashboard'}, canActivate: [VerificaTokenGuard]},
        { path:'progress', component:ProgressComponent, data:{titulo:'Progress'}},
        { path:'graficas1', component:Graficas1Component, data:{titulo:'Graficas'}},
        { path:'promesas', component:PromesasComponent, data:{titulo:'Promesas'}},
        { path:'rxjs', component:RxjsComponent, data:{titulo:'Rxjs'}},
        { path:'account', component:AccountSettingsComponent, data:{titulo:'Account'}},
        { path:'profile', component:ProfileComponent, data:{titulo:'Perfil de usuario'}},
        { path:'busqueda/:termino', component:BusquedaComponent, data:{titulo:'Busqueda'}},

        //mantenimientos
        { path:'usuarios', component:UsuariosComponent, data:{titulo:'Mantenimiento de usuario'}, canActivate: [AdminGuard]},
        { path:'hospitales', component:HospitalesComponent, data:{titulo:'Mantenimiento de hospitales'}},
        { path:'medicos', component:MedicosComponent, data:{titulo:'Mantenimiento de medicos'}},
        { path:'medico/:id', component:MedicoComponent, data:{titulo:'Mantenimiento de medico'}},

        { path:'', redirectTo:'/dashboard', pathMatch:'full'}    
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)