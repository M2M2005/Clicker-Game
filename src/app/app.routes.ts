import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home }, // Cette ligne définit ta page d'accueil
  { path: 'game', loadComponent: () => import('./game/game').then(m => m.GameComponent)}, // J'ai une erreur ici, car tu n'as pas de GameComponent dans game.ts
  { path: '**', redirectTo: '' }
];
