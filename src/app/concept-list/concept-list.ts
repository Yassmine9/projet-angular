import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConceptService, Chapter } from '../concept.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './concept-list.html',
  styleUrls: ['./concept-list.css'],
  imports: [CommonModule, RouterModule]
})
export class ConceptList implements OnInit {

  chapters$: Observable<Chapter[]>;
  activeChapterId: number | null = null;

  // 🔹 carte actuellement ouverte
  expandedCardId: number | null = null;

  constructor(
    private conceptService: ConceptService,
    private router: Router
  ) {
    this.chapters$ = this.conceptService.getAllChapters();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.setupScrollObserver();
    }, 500);
  }

  // 🔁 Ouvrir / fermer les détails d’une carte
  toggleDetails(cardId: number): void {
    this.expandedCardId =
      this.expandedCardId === cardId ? null : cardId;
  }

  // Navigation vers le jeu
 goToGame(conceptId: number): void {
  this.router.navigate(['/concepts', conceptId]);
}


  // Suppression d'un concept
  deleteConcept(conceptId: number, chapterId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce concept ?')) {
      this.conceptService.deleteConcept(conceptId);
      this.conceptService.deleteCardFromChapter(chapterId, conceptId);
    }
  }

  // Scroll vers chapitre
  scrollToChapter(chapterId: number): void {
    const element = document.getElementById(`chapter-${chapterId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeChapterId = chapterId;
    }
  }

  // Observer scroll
  private setupScrollObserver(): void {
    const chapters = document.querySelectorAll('.chapter');
    if (chapters.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('chapter-', '');
            this.activeChapterId = parseInt(id, 10);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    chapters.forEach(chapter => observer.observe(chapter));
  }
}
