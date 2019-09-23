import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';


const appRoutes: Routes = [   
    { path:'login', component:LoginComponent},
    { path:'register', component:RegisterComponent},
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        loadChildren: './pages/pages.module#PagesModule'  // 2 parametros llevva
    },
    { path:'**', component:NopagefoundComponent},
]

export  const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash:true });