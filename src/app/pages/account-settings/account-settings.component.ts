import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {


 public linkTheme = document.querySelector('#theme');
 public links: NodeListOf<Element>;
  constructor() { }

  ngOnInit(): void {
    
    this.links  = document.querySelectorAll('.selector');
    this.check();
  }

changeTheme( theme: string){

  
  const url = `./assets/css/colors/${theme}.css`;

  this.linkTheme.setAttribute('href', url);
  localStorage.setItem('theme',url)

  this.check();

}

check(){



  this.links.forEach( elem =>{

    elem.classList.remove('working');
    const btnTheme = elem.getAttribute('data-theme');
    const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
    const currentTheme = this.linkTheme.getAttribute('href');

    if ( btnThemeUrl === currentTheme){

      elem.classList.add('working')
    }

  })


}

}
