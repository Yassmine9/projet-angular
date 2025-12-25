import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConceptService, Chapter } from '../services/concept.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './concept-list.html',
  styleUrls: ['./concept-list.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ConceptList implements OnInit {

  chapters$: Observable<Chapter[]>;
  allChapters: Chapter[] = [];
  filteredChapters: Chapter[] = [];
  activeChapterId: number | null = null;
  expandedCardId: number | null = null;

  constructor(
    private conceptService: ConceptService,
    private router: Router
  ) {
    this.chapters$ = this.conceptService.getAllChapters();
  }

  ngOnInit(): void {
    // Load all chapters and automatically select the first one
    this.chapters$.subscribe(chapters => {
      this.allChapters = chapters;
      
      // Automatically show first chapter on load
      if (chapters.length > 0) {
        this.filterChapter(chapters[0].chapterId);
      }
    });
  }

  toggleDetails(cardId: number): void {
    this.expandedCardId = this.expandedCardId === cardId ? null : cardId;
  }

  goToGame(conceptId: number): void {
    this.router.navigate(['/concepts', conceptId]);
  }

  deleteConcept(conceptId: number, chapterId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce concept ?')) {
      this.conceptService.deleteConcept(conceptId);
      this.conceptService.deleteCardFromChapter(chapterId, conceptId);
      
      // Refresh the filtered chapters after deletion
      this.chapters$.subscribe(chapters => {
        this.allChapters = chapters;
        this.filterChapter(this.activeChapterId!);
      });
    }
  }

  editConcept(conceptId: number): void {
    this.router.navigate(['/edit', conceptId]);
  }

  // Filter to show only one chapter
  filterChapter(chapterId: number): void {
    this.activeChapterId = chapterId;
    
    // Filter to show only the selected chapter
    this.filteredChapters = this.allChapters.filter(
      chapter => chapter.chapterId === chapterId
    );
    
    // Scroll to top of main content smoothly
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}