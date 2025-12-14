import { Routes } from '@angular/router';
import { ConceptList } from './concept-list/concept-list';
import { ConceptDetails} from './concept-details/concept-details';
import { Game } from './game/game';
import { Home } from './home/home';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'concepts', component: ConceptList },
  { path: 'concepts/:id', component: ConceptDetails},
  { path: 'game/:id', component: Game },


  { path: '**', redirectTo: 'home' }
];
