import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.css']
})
export class BreadcrumsComponent  {

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router:Router) { 

  this.tituloSubs$ =  this.nombreRutas()
  .subscribe(({titulo}) =>{
  
    this.titulo = titulo;
  })
 
  }
  ngOnDestroy(): void {
   this.tituloSubs$.unsubscribe();
  }

  nombreRutas(){

    return this.router.events
     .pipe(
       filter(event =>event instanceof ActivationEnd ),
       filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
       map((event: ActivationEnd) => event.snapshot.data),
     );
     }

    }