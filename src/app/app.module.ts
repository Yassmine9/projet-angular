// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common'; // <-- needed for ngModel
import { AppRoutingModule } from './app.routes'; // your routing module
import { DragDropModule } from '@angular/cdk/drag-drop';

// Components
import { Home } from './home/home';

import { ConceptDetails } from './concept-details/concept-details';
import { ConceptFormComponent } from './concept-form/concept-form';
import { GameComponent } from './game/game';

import { App } from './app'; // root component

@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    App,
    Home,
    DragDropModule,
    ConceptDetails,
    ConceptFormComponent,
    GameComponent
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
