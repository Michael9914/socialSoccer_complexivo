import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';





@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  
  ],

  exports: [
  
    LoginComponent,

  ],

  imports: [
    CommonModule,
    AppRoutingModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
  ]
})
export class AuthModule { }
