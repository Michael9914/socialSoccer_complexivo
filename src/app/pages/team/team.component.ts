import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.models';
import { TeamService } from 'src/app/services/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  constructor(public teamService: TeamService, private router: Router) {}

  ngOnInit() {
    this.getTeams();
  }

  addTeam(form?: NgForm) {
    if (form.value._id) {
      Swal.fire('Admin', `Se actualizo exitosamente`, 'success');

      this.teamService.putTeam(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getTeams();
      });
    }else{
      Swal.fire('Vocalia', `Se creo exitosamente`, 'success');

      this.teamService.postTeam(form.value).subscribe((res) => {
        this.getTeams();
        this.resetForm(form);
      });
  }
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

  editTeam(team: Team) {
    this.teamService.selectedTeam = team;
  }

  deleteTeam(_id: string, form: NgForm) {


    Swal
    .fire({
        title: "Admin",
        text: "¿Estas seguro de eliminar el usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            console.log("*se elimina el usuario*");
            Swal.fire('Admin', `Se borro exitosamente`, 'success');
            this.teamService.deleteTeam(_id).subscribe((res) => {
              this.getTeams();
              this.resetForm(form);
            });
        } else {
            // Dijeron que no
            console.log("*NO se elimina el usuario");
        }
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.teamService.selectedTeam = new Team();
    }
  }

}
