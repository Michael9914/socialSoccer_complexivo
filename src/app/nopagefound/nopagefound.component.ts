import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateHome() {
    this.router.navigate(['/dashboard']);
  }


}
