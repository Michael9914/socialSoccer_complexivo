import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Vocalia } from 'src/app/models/vocalia.model';
import { TeamService } from 'src/app/services/team.service';
import { VocaliaService } from 'src/app/services/vocalia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vocal',
  templateUrl: './vocal.component.html',
  styleUrls: ['./vocal.component.css'],
  providers: [VocaliaService, TeamService],
})
export class VocalComponent implements OnInit {

  constructor(public vocalService: VocaliaService, public teamService: TeamService, private router: Router) { }

  ngOnInit() {
    this.getVocalias();
    this.getTeams();
  }

  addVocalia(form?: NgForm) {
    if (form.value._id) {
      Swal.fire('Vocalia', `Se actualizo exitosamente`, 'success');

      this.vocalService.putVocalia(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getVocalias();
      });
    }
      Swal.fire('Vocalia', `Se creo exitosamente`, 'success');

      this.vocalService.postVocalia(form.value).subscribe((res) => {
        this.getVocalias();
        this.resetForm(form);
      });
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

  postVocalia(form?:NgForm){
    this.vocalService.postVocalia(form.value).subscribe(
      (res) => {
        this.getVocalias();
        this.resetForm(form);
      }
    )
  }

  editVocal(vocalia: Vocalia ) {
    this.vocalService.selectedVocalia = vocalia;
  }

  deleteVocalia(_id: string, form: NgForm) {


    Swal
    .fire({
        title: "Vocalia",
        text: "¿Estas seguro de eliminar el vocal?",
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
            this.vocalService.deleteVocalia(_id).subscribe((res) => {
              this.getVocalias();
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
      this.vocalService.selectedVocalia = new Vocalia();
    }
  }

}
