import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VocalResult } from 'src/app/models/vocaliaResult.model';
import { TeamService } from 'src/app/services/team.service';
import { VocalResultService } from 'src/app/services/vocal-result.service';
import { VocaliaService } from 'src/app/services/vocalia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vocal-result',
  templateUrl: './vocal-result.component.html',
  styleUrls: ['./vocal-result.component.css'],
  providers: [VocalResultService, VocaliaService ],
})
export class VocalResultComponent implements OnInit {

  constructor(public vocalResultService: VocalResultService, public teamService: TeamService, public vocalService: VocaliaService, private router: Router) { }

  ngOnInit(){
    this.getVocalResults();
    this.getVocalias();
    this.getTeams();
  }

  addVocalResult(form?: NgForm){
    if (form.value._id) {
      Swal.fire('VocaliaResult', `Se actualizo exitosamente`, 'success');

      this.vocalResultService.putVocalResult(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getVocalResults();
      });
    }else{
      Swal.fire('Vocalia', `Se creo exitosamente`, 'success');

      this.vocalResultService.postVocalResult(form.value).subscribe((res) => {
        this.getVocalResults();
        this.resetForm(form);
      });
    }
  }

  getVocalResults() {
    this.vocalResultService.getVocalResults().subscribe(
      (res) => {
      this.vocalResultService.vocalResults = res;
    },  err =>{    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.router.navigate(['/signin']);
      }
    }}
    );
  }

  getTeams() {
    this.teamService.getTeams().subscribe(
      (res) => {
      this.teamService.teams = res;
    },  err =>{    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.router.navigate(['/signin']);
      }
    }}
    );
  }

  getVocalias() {
    this.vocalService.getVocalias().subscribe(
      (res) => {
      this.vocalService.vocalias = res;
    },  err =>{    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.router.navigate(['/signin']);
      }
    }}
    );
  }

  postVocalResult(form?:NgForm){
    this.vocalResultService.postVocalResult(form.value).subscribe(
      (res) => {
        this.getVocalResults();
        this.resetForm(form);
      }
    )
  }

  editVocalResult(vocalResult: VocalResult ) {
    this.vocalResultService.selectedVocalResult = vocalResult;
  }

  deleteVocalResult(_id: string, form: NgForm) {


    Swal
    .fire({
        title: "Vocalia",
        text: "¿Estas seguro de eliminar los resultados del vocal?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            console.log("*se elimina el vocal*");
            Swal.fire('Vocal', `Se borro exitosamente`, 'success');
            this.vocalResultService.deleteVocalResult(_id).subscribe((res) => {
              this.getVocalResults();
              this.resetForm(form);
            });
        } else {
            // Dijeron que no
            console.log("*NO se elimina el vocal");
        }
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.vocalResultService.selectedVocalResult = new VocalResult();
    }
  }

}
