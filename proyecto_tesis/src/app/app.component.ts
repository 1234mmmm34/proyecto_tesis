import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherAirplay, featherUser } from '@ng-icons/feather-icons';
import { featherSearch, featherAtSign } from '@ng-icons/feather-icons';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar';


//import { heroUsers } from '@ng-icons/heroicons/outline';
import { BrowserModule } from '@angular/platform-browser';
//import { IonIcon } from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgIconComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideIcons({ featherAirplay, featherSearch, featherAtSign, featherUser })],

})
export class AppComponent {
  title = 'tesis';



  ngOnInit(): void{
  
}

imagenURL: string = '../assets/people.png';
}