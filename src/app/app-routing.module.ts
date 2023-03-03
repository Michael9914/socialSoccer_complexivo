
import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';








const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },




];

@NgModule({
  declarations: [],
  imports: [
 RouterModule.forRoot( routes, { useHash: true }),

  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
