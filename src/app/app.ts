import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface Upgrade {
  id: number;
  name: string;
  description: string;
  subUpgrades: SubUpgrade[];
  idCurrentSubUpgrade: number;
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
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App implements OnInit {
  totalMetersClimbed: number = 0;
  currentRouteProgress: number = 0;
  climbPuissance: number = 1;
  coins: number = 0;

  idRouteCurrent: number = 1;
  currentSelectedRoute!: Route;
  progressPercentage: number = 0;

  routesList: Route[] = [
    { id: 1, cotation: '5A', metersRequired: 10, coinReward: 10 },
    { id: 2, cotation: '5B', metersRequired: 25, coinReward: 40 },
    { id: 3, cotation: '5C', metersRequired: 100, coinReward: 150 },
    { id: 4, cotation: '6A', metersRequired: 666, coinReward: 1000 },
    { id: 5, cotation: '6B', metersRequired: 2005, coinReward: 5000 },
    { id: 6, cotation: '6C', metersRequired: 20202, coinReward: 40000 },
    { id: 7, cotation: '7A', metersRequired: 69069, coinReward: 120000 },
    { id: 8, cotation: '7B', metersRequired: 200911, coinReward: 250000 },
    { id: 9, cotation: '7C', metersRequired: 505505, coinReward: 700000 },
    { id: 10, cotation: '8A', metersRequired: 1_000_000, coinReward: 2_500_000 },
    { id: 11, cotation: '8B', metersRequired: 15_000_000, coinReward: 33_000_000 },
    { id: 12, cotation: '8C', metersRequired: 99_999_999, coinReward: 500_000_000 },
    { id: 13, cotation: '9A', metersRequired: 444_444_444, coinReward: 4_000_000_000 },
    { id: 14, cotation: '9B', metersRequired: 1_000_000_000, coinReward: 20_000_000_000 },
    { id: 15, cotation: '9C', metersRequired: 1_000_000_000_000, coinReward: 100_000_000_000 },
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
        { name: 'Supersonique Légende (EB 99%)', cost: 700000, climbBonus: 500 }
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
        { name: 'Scarpa Drago Lv', cost: 1_000_000, climbBonus: 1200 },
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
      id: 4, // Changed ID from 3 to 4 to ensure uniqueness
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
    {
      id: 5,
      name: 'Abonnement',
      description: 'Améliore votre progression.',
      idCurrentSubUpgrade: 0,
      subUpgrades: [
        { name: 'Roc Escale', cost: 100, climbBonus: -20 },
        { name: 'Cob Escalade', cost: 5000, climbBonus: 5 },
        { name: 'ALTISSIMO', cost: 10000, climbBonus: 20 },
        { name: 'Climb Up', cost: 50000, climbBonus: 15 },
        { name: 'Bloc Session', cost: 200000, climbBonus: 50 },
        { name: 'Arkose', cost: 5_000_000, climbBonus: 5500 },
        { name: 'Boulder Line', cost: 10_000_000, climbBonus: 15000 }
      ]
    },
    {
      id: 6,
      name: 'Doigts',
      description: 'Améliore votre force de préhension.',
      idCurrentSubUpgrade: 0,
      subUpgrades: [
        { name: 'Terre', cost: 50, climbBonus: 1 },
        { name: 'Bois', cost: 500, climbBonus: 2 },
        { name: 'Plastique', cost: 5000, climbBonus: -50 },
        { name: 'Métal', cost: 50000, climbBonus: 10 },
        { name: 'Carbone', cost: 250_000, climbBonus: 100 },
        { name: 'Diamant', cost: 700_000, climbBonus: 500 },
        { name: 'Adamantium', cost: 1_500_000, climbBonus: 2500 },
        { name: 'Vibranium', cost: 5_555_555, climbBonus: 9999 },
        { name: 'Caca', cost: 100_000_000, climbBonus: 54321 }
      ]
    }
  ];

  constructor() {
    this.currentSelectedRoute = this.routesList[0];
  }

  ngOnInit() {
    this.loadGame();
    this.updateCurrentRoute();
    this.updateProgressBar();
  }

  saveGame() {
    const gameState = {
      totalMetersClimbed: this.totalMetersClimbed,
      currentRouteProgress: this.currentRouteProgress,
      climbPuissance: this.climbPuissance,
      coins: this.coins,
      idRouteCurrent: this.idRouteCurrent,
      upgrades: this.upgrades.map(upgrade => ({
        id: upgrade.id,
        idCurrentSubUpgrade: upgrade.idCurrentSubUpgrade
      }))
    };
    localStorage.setItem('climbingGameSave', JSON.stringify(gameState));
    console.log('Jeu sauvegardé localement !');
  }

  loadGame() {
    const savedState = localStorage.getItem('climbingGameSave');
    if (savedState) {
      try {
        const gameState = JSON.parse(savedState);

        this.totalMetersClimbed = gameState.totalMetersClimbed ?? 0;
        this.currentRouteProgress = gameState.currentRouteProgress ?? 0;
        this.coins = gameState.coins ?? 0;
        this.idRouteCurrent = gameState.idRouteCurrent ?? 1;

        if (gameState.upgrades && Array.isArray(gameState.upgrades)) {
          this.upgrades.forEach(localUpgrade => {
            const savedUpgrade = gameState.upgrades.find((su: any) => su.id === localUpgrade.id);
            if (savedUpgrade) {
              localUpgrade.idCurrentSubUpgrade = savedUpgrade.idCurrentSubUpgrade;
            }
          });
        }

        this.climbPuissance = 1;
        this.upgrades.forEach(upgrade => {
          for (let i = 0; i < upgrade.idCurrentSubUpgrade; i++) {
            if (upgrade.subUpgrades[i]) {
              this.climbPuissance += upgrade.subUpgrades[i].climbBonus;
            }
          }
        });
        this.climbPuissance = gameState.climbPuissance ?? this.climbPuissance;
        console.log('Jeu chargé depuis la sauvegarde locale !', gameState);
      } catch (e) {
        console.error("Erreur lors du chargement de la sauvegarde :", e);
        localStorage.removeItem('climbingGameSave');
      }
    } else {
      console.log('Aucune sauvegarde locale trouvée. Démarrage d\'une nouvelle partie.');
      this.totalMetersClimbed = 0;
      this.currentRouteProgress = 0;
      this.climbPuissance = 1;
      this.coins = 0;
      this.idRouteCurrent = 1;
      this.upgrades.forEach(upgrade => upgrade.idCurrentSubUpgrade = 0);
    }
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
    this.saveGame();
  }

  buyUpgrade(upgrade: Upgrade) {
    const currentSubUpgradeIndex = upgrade.idCurrentSubUpgrade;
    if (currentSubUpgradeIndex < upgrade.subUpgrades.length) {
      const subUpgradeToBuy = upgrade.subUpgrades[currentSubUpgradeIndex];

      if (this.coins >= subUpgradeToBuy.cost) {
        this.coins -= subUpgradeToBuy.cost;
        this.climbPuissance += subUpgradeToBuy.climbBonus;
        upgrade.idCurrentSubUpgrade++;
        this.saveGame();
      } else {
        console.log("Not enough coins to buy this upgrade: " + subUpgradeToBuy.name);
      }
    } else {
      console.log("All levels for this upgrade have been purchased.");
    }
  }

  updateCurrentRoute() {
    const routeIndex = this.idRouteCurrent - 1;
    if (routeIndex >= 0 && routeIndex < this.routesList.length) {
      this.currentSelectedRoute = this.routesList[routeIndex];
    } else {
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
      this.saveGame();
    }
  }

  difficultyPlus() {
    if (this.idRouteCurrent < this.routesList.length) {
      this.idRouteCurrent++;
      this.currentRouteProgress = 0;
      this.updateCurrentRoute();
      this.updateProgressBar();
      this.saveGame();
    }
  }

  getSubUpgrade(upgrade: Upgrade, index: number): SubUpgrade | null {
    if (index >= 0 && index < upgrade.subUpgrades.length) {
      return upgrade.subUpgrades[index];
    }
    return null;
  }

  formatNumber(num: number): string {
    if (num >= 1_000_000_000_000_000) {
      return (num / 1_000_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'Q';
    }
    if (num >= 1_000_000_000_000) {
      return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
    }
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  }
}
