import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VocalResultService } from 'src/app/services/vocal-result.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public vocalResultService: VocalResultService, private router:Router) { }

  ngOnInit() {
    this.getVocalResults();
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
}
