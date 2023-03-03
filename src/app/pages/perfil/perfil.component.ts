import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.models';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  
  usuario :Usuario;
  imagenSubir: File;
  imagenTemporal: any;
  
    constructor(public _usuarioServices: UsuariosService ) {
     this.usuario = this._usuarioServices.usuario;
     }
  
    ngOnInit() {
    }
    
  
    guardar(usuario:Usuario){
  
      this.usuario.nombre = usuario.nombre;
      this.usuario.email = usuario.email;
      
      //funcion de actulizar 
      this._usuarioServices.actualizarUsuario(usuario)
      .subscribe( resp =>{
        console.log(resp);
  
        Swal.fire('Usuario', `Actualizado con exito`, 'success');
      })
   }
  
   seleccionaImagen( archivo: File){
     
    if(!archivo){
      this.imagenSubir = null;
     return;
    }
  
    this.imagenSubir = archivo;
   console.log(event);
  
   let reader = new FileReader();
   let urlImagenTemp = reader.readAsDataURL( archivo );
  
   reader.onloadend = () =>{
    this.imagenTemporal = reader.result;
  
   } 
   }
  
  
   cambiarImagen(){
  
    this._usuarioServices.cambiarImagen(this.imagenSubir, this.usuario._id)
   }
  
  }
  
