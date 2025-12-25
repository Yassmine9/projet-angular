import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { ConceptList } from './concept-list/concept-list';
import { ConceptDetails } from './concept-details/concept-details';
import { ConceptFormComponent } from './concept-form/concept-form';
import { GameComponent } from './game/game';
import { FormsModule } from '@angular/forms'; 

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'concepts', component: ConceptList },
  { path: 'concepts/:id', component: ConceptDetails },
  { path: 'add', component: ConceptFormComponent },
  { path: 'edit/:id', component: ConceptFormComponent }, // Edit route
  { path: 'game/:id', component: GameComponent },

  { path: '**', redirectTo: 'home' } // fallback for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
