import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { from, Observable } from 'rxjs';
import { ConceptService, Chapter } from '../services/concept.service';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  introChapter$: Observable<Chapter | undefined>;
  private observer?: IntersectionObserver;
  private animationTriggered = false;

  constructor(private conceptService: ConceptService) {
    this.introChapter$ = this.conceptService.getChapterById(0);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.initializeCounterAnimation();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initializeCounterAnimation(): void {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animationTriggered) {
          this.animationTriggered = true;
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          
          statNumbers.forEach((stat) => {
            const element = stat as HTMLElement;
            const targetValue = element.getAttribute('data-target');
            
            if (targetValue) {
              const target = parseInt(targetValue, 10);
              
              // Tous les compteurs démarrent ensemble avec une durée de 4 secondes
              this.animateCounter(element, target, 1000);
            }
          });
          
          // Arrêter d'observer après l'animation
          if (this.observer) {
            this.observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observer la section des statistiques
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
      this.observer.observe(statsSection);
    }
  }

  private animateCounter(element: HTMLElement, target: number, duration: number = 2000): void {
    const start = 0;
    const suffix = element.getAttribute('data-suffix') || '';
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toString() + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toString() + suffix;
      }
    }, 16);
  }
}