import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Upgrade {
  id: number;
  name: string;
  description: string;
  subUpgrades : SubUpgrade[];
  idCurrentSubUpgrade : number;
}

interface SubUpgrade {
  name: string;
  cost: number;
  climbBonus: number;
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
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  totalMetersClimbed: number = 0;
  currentRouteProgress: number = 0;
  climbPuissance: number = 1;
  coins: number = 1000000000000000;

  idRouteCurrent: number = 1;
  currentSelectedRoute !: Route;
  progressPercentage: number = 0;

  routesList: Route[] = [
    { id: 1, cotation: '5A', metersRequired: 10, coinReward: 10 },
    { id: 2, cotation: '5B', metersRequired: 25, coinReward: 40 },
    { id: 3, cotation: '5C', metersRequired: 100, coinReward: 150 },
    { id: 4, cotation: '6A', metersRequired: 666, coinReward: 1000 },
    { id: 5, cotation: '6B', metersRequired: 2005, coinReward: 5000 },
    { id: 6, cotation: '6C', metersRequired: 20202, coinReward: 4000 },
    { id: 7, cotation: '7A', metersRequired: 69069, coinReward: 10000 },
    { id: 8, cotation: '7B', metersRequired: 110911, coinReward: 20000 },
    { id: 9, cotation: '7C', metersRequired: 505505, coinReward: 100000 },
    { id: 10, cotation: '8A', metersRequired: 1000000, coinReward: 1234567 },
    { id: 11, cotation: '8B', metersRequired: 25000000, coinReward: 4876321 },
    { id: 12, cotation: '8C', metersRequired: 99999999, coinReward: 10000000 },
    { id: 13, cotation: '9A', metersRequired: 123456789, coinReward: 50000000 },
    { id: 14, cotation: '9B', metersRequired: 1000000000, coinReward: 100000000 },
    { id: 15, cotation: '9C', metersRequired: 1000000000000, coinReward: 50000000 }
  ];

  upgrades: Upgrade[] = [
    {
      id: 1,
      name: 'Magnésie',
      description: 'Améliore votre adhérence.',
      idCurrentSubUpgrade: 0,
      subUpgrades: [
        { name: 'Bronze (Beal)', cost: 10, climbBonus: 1 },
        { name: 'Argent', cost: 50, climbBonus: 2 },
        { name: 'Or', cost: 200, climbBonus: 5 },
        { name: 'Platine', cost: 1000, climbBonus: 10 },
        { name: 'Diamant', cost: 5000, climbBonus: 20 },
        { name: 'Champion (Raphaël)', cost: 25000, climbBonus: 50 },
        { name: 'Grand Champion', cost: 100000, climbBonus: 100 },
        { name: 'Supersonique Légende (EB 99%)', cost: 500000, climbBonus: 500 }
      ]
    },
    {
      id: 2,
      name: 'Chaussures',
      description: 'Améliore votre confort et adhérence.',
      idCurrentSubUpgrade: 0,
      subUpgrades: [
        { name: 'Simond (Decathlon)', cost: 15, climbBonus: 1 },
        { name: 'EB (Les jaunes là)', cost: 250, climbBonus: 2 },
        { name: 'Scarpa', cost: 1111, climbBonus: 5 },
        { name: 'Scarpa Instinct VS', cost: 70000, climbBonus: 50},
        { name: 'Scarpa Drago Lv', cost: 450000, climbBonus: 250 },
      ]
    },
    {
      id: 3,
      name: 'Cordes',
      description: 'Améliore votre sécurité.',
      idCurrentSubUpgrade: 0,
      subUpgrades: [
        { name: 'Beal (25m)', cost: 3544, climbBonus: 1},
        { name: 'Beal (50m)', cost: 32101, climbBonus: 22 },
        { name: 'Beal (100m)', cost: 265451, climbBonus: 54 },
        { name: 'Beal (200m)', cost: 698742, climbBonus: 354 },
      ]
    },
    {
      id: 3,
      name: 'Entraîneurs',
      description: 'Améliore votre force et endurance.',
      idCurrentSubUpgrade: 0,
      subUpgrades: [
        { name: 'Killian', cost: 100, climbBonus: -5 },
        { name: 'Maël', cost: 3214, climbBonus: 0 },
        { name: 'Cyprien', cost: 135452, climbBonus: 534 },
        { name: 'Raphaël', cost: 543434, climbBonus: 987 },
      ]
    },

  ];

  ngOnInit() {
    this.updateCurrentRoute();
    this.updateProgressBar();
  }

  climbButton() {
    this.currentRouteProgress += this.climbPuissance;
    this.totalMetersClimbed += this.climbPuissance;
    this.updateProgressBar();

    if (this.currentRouteProgress >= this.currentSelectedRoute.metersRequired) {
      this.coins += this.currentSelectedRoute.coinReward;
      this.currentRouteProgress = 0;
      this.updateProgressBar();
    }
  }

  buyUpgrade(upgrade: Upgrade) {
    const currentSubUpgradeIndex = upgrade.idCurrentSubUpgrade;
    if (currentSubUpgradeIndex < upgrade.subUpgrades.length) {
      const subUpgradeToBuy = upgrade.subUpgrades[currentSubUpgradeIndex];

      if (this.coins >= subUpgradeToBuy.cost) {
        this.coins -= subUpgradeToBuy.cost;
        this.climbPuissance += subUpgradeToBuy.climbBonus;
        upgrade.idCurrentSubUpgrade++;
      } else {
        console.log("Not enough coins to buy this upgrade: " + subUpgradeToBuy.name);
      }
    } else {
      console.log("All levels for this upgrade have been purchased.");
    }
  }

  updateCurrentRoute() {
    this.currentSelectedRoute = this.routesList[this.idRouteCurrent - 1];
    if (!this.currentSelectedRoute) {
      this.currentSelectedRoute = this.routesList[0];
      this.idRouteCurrent = 1;
    }
  }

  updateProgressBar() {
    const progress = (this.currentRouteProgress / this.currentSelectedRoute.metersRequired) * 100;
    this.progressPercentage = Math.min(100, Math.max(0, progress));
    document.documentElement.style.setProperty('--progress', `${this.progressPercentage}%`);
  }

  difficultyMoins() {
    if (this.idRouteCurrent > 1) {
      this.idRouteCurrent--;
      this.currentRouteProgress = 0;
      this.updateCurrentRoute();
      this.updateProgressBar();
    }
  }

  difficultyPlus() {
    if (this.idRouteCurrent < this.routesList.length) {
      this.idRouteCurrent++;
      this.currentRouteProgress = 0;
      this.updateCurrentRoute();
      this.updateProgressBar();
    }
  }

  getSubUpgrade(upgrade: Upgrade, index: number): SubUpgrade | null {
    if (index >= 0 && index < upgrade.subUpgrades.length) {
      return upgrade.subUpgrades[index];
    }
    return null;
  }

  formatNumber(num: number): string {
    if (num >= 1000000000000000) {
      return (num / 1000000000000000).toFixed(1).replace(/\.0$/, '') + 'Q';
    }
    if (num >= 1000000000000) {
      return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
    }
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  }
}
