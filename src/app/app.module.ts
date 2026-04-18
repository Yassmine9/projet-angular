import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Components (non-standalone)
import { Home } from './home/home';
import { ConceptDetails } from './concept-details/concept-details';
import { ConceptFormComponent } from './concept-form/concept-form';
import { GameComponent } from './game/game';

// Root standalone component
import { App } from './app';

@NgModule({
  declarations: [ 

  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    DragDropModule,
    App,

    ConceptDetails,
    ConceptFormComponent,
    GameComponent,
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule {}
