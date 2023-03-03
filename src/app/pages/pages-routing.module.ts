import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AdminUsuariosComponent } from './administrador/admin-usuarios/admin-usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminGuard } from '../guards/admin.guard';
import { VocalComponent } from './vocal/vocal.component';
import { VocalResultComponent } from './vocal-result/vocal-result.component';
import { TeamComponent } from './team/team.component';



const routes: Routes = [
  {
    path: 'dashboard', canActivate:[AdminGuard],
    component: PagesComponent,
    children: [
        { path: '', component: DashboardComponent, data:{ titulo: 'Dashboard'},canActivate:[AdminGuard] },
        { path: 'perfil', component: PerfilComponent,  data:{ titulo: 'Perfil'} ,canActivate:[AdminGuard]},
        { path: 'account-settings', component: AccountSettingsComponent,  data:{ titulo: 'Temas'},canActivate:[AdminGuard], },

        { path: 'adminUsers', component: AdminUsuariosComponent,  data:{ titulo: 'Usuarios Registrados'},canActivate:[AdminGuard], },
        {path: 'vocal', component: VocalComponent, data:{ titulo: 'Vocal'},canActivate:[AdminGuard],},
        {path: 'vocalResult', component: VocalResultComponent, data:{ titulo: 'Resultado'},canActivate:[AdminGuard],},
        {path: 'teams', component: TeamComponent, data:{ titulo: 'AGREGAR EQUIPOS'},canActivate:[AdminGuard],}


      ]
},
//
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes,)
  ],

  exports:[ RouterModule]
})
export class PagesRoutingModule { }
