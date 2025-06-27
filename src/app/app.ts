import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface Upgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  climbBonus: number;
  purchased: boolean;
}

interface Route {
  id: number;
  cotation: string;
  metersRequired: number;
  coinReward: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})


export class App implements OnInit {
  totalMetersClimbed: number = 0; // Total des mètres grimpés sur toutes les voies
  currentRouteProgress: number = 0; // Mètres grimpés sur la voie actuelle

  climbPuissance: number = 1; // Puissance de grimpe par mouvement

  coins: number = 0; // Nombre de coins

  idRouteCurrent: number = 1; // ID de la voie actuelle (commence à 1)

  // Référence à la voie actuellement sélectionnée, initialisée dans ngOnInit
  currentSelectedRoute !: Route; // Utilisation de l'opérateur "!" pour affirmer qu'elle sera initialisée

  routesList: Route[] = [
    { id: 1, cotation: '5A', metersRequired: 10, coinReward: 10 },
    { id: 2, cotation: '5B', metersRequired: 25, coinReward: 40 },
    { id: 3, cotation: '5C', metersRequired: 100, coinReward: 150 },
    { id: 4, cotation: '6A', metersRequired: 666, coinReward: 1000 },
    { id: 5, cotation: '6B', metersRequired: 2005, coinReward: 5000 },
    { id: 6, cotation: '6C', metersRequired: 20202, coinReward: 40000 },
    { id: 7, cotation: '7A', metersRequired: 69069, coinReward: 100000 },
    { id: 8, cotation: '7B', metersRequired: 110911, coinReward: 200000 },
    { id: 9, cotation: '7C', metersRequired: 505505, coinReward: 1000000 },
    { id: 10, cotation: '8A', metersRequired: 1111111, coinReward: 123456789 }
  ];

  upgrades: Upgrade[] = [
    {
      id: 1,
      name: 'Magnésie de Base',
      description: 'Améliore votre adhérence.',
      cost: 10,
      climbBonus: 1,
      purchased: false
    },
    {
      id: 2,
      name: 'Chaussons Précis',
      description: 'Meilleure pose de pieds.',
      cost: 50,
      climbBonus: 2,
      purchased: false
    },
    {
      id: 3,
      name: 'Abonnement Salle',
      description: 'Accès illimité aux murs.',
      cost: 200,
      climbBonus: 5,
      purchased: false
    },
    {
      id: 4,
      name: 'Entraîneur Personnel',
      description: 'Optimise vos séances.',
      cost: 500,
      climbBonus: 10,
      purchased: false
    }
  ];

  ngOnInit() {
    this.updateCurrentRoute();
  }

  get climbMetersPerClick(): number {
    return this.climbPuissance;
  }

  climbButton() {
    this.currentRouteProgress += this.climbPuissance;
    this.totalMetersClimbed += this.climbPuissance;

    if (this.currentRouteProgress >= this.currentSelectedRoute.metersRequired) {
      this.coins += this.currentSelectedRoute.coinReward;
      this.currentRouteProgress = 0;
    }
  }

  buyUpgrade(upgrade: Upgrade) {
    if (this.coins >= upgrade.cost && !upgrade.purchased) {
      this.coins -= upgrade.cost;
      this.climbPuissance += upgrade.climbBonus;
      upgrade.purchased = true;
    }
  }

  updateCurrentRoute() {
    this.currentSelectedRoute = this.routesList[this.idRouteCurrent - 1];
  }

  difficultyMoins() {
    if (this.idRouteCurrent > 1) {
      this.idRouteCurrent--;
      this.currentRouteProgress = 0;
      this.updateCurrentRoute();
    }
  }

  difficultyPlus() {
    if (this.idRouteCurrent < this.routesList.length) {
      this.idRouteCurrent++;
      this.currentRouteProgress = 0;
      this.updateCurrentRoute();
    }
  }
}
