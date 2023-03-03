import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

  constructor() { 
    localStorage.removeItem('idNotification');
  }

  ngOnInit(): void {

    const url = localStorage.getItem('theme') || './assets/css/colors/green.css';
    //const url = `./assets/css/colors/${theme}.css`;

   this.linkTheme.setAttribute('href', url);

  }

}
