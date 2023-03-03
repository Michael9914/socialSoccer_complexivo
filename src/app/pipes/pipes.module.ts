import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';


@NgModule({
  declarations: [
    ImagenPipe,
 
  
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImagenPipe,
  
  ],
  providers: [
    
   
  ],
})
export class PipesModule { }
