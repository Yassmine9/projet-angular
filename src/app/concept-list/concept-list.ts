import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConceptService, Chapter } from '../services/concept.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeleteConfirmation } from '../delete-confirmation/delete-confirmation';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './concept-list.html',
  styleUrls: ['./concept-list.css'],
<<<<<<< HEAD
  imports: [CommonModule, RouterModule, DeleteConfirmation]
=======
  standalone: true,
  imports: [CommonModule, RouterModule]
>>>>>>> origin/yasmine
})
export class ConceptList implements OnInit {

  chapters$: Observable<Chapter[]>;
  allChapters: Chapter[] = [];
  filteredChapters: Chapter[] = [];
  activeChapterId: number | null = null;
<<<<<<< HEAD


=======
>>>>>>> origin/yasmine
  expandedCardId: number | null = null;


  showDeleteDialog: boolean = false;
  conceptToDelete: { id: number, chapterId: number } | null = null;

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
    this.conceptToDelete = { id: conceptId, chapterId: chapterId };
    this.showDeleteDialog = true;
  }

  // Confirmer la suppression
  confirmDelete(): void {
    if (this.conceptToDelete) {
      this.conceptService.deleteConcept(this.conceptToDelete.id);
      this.conceptService.deleteCardFromChapter(this.conceptToDelete.chapterId, this.conceptToDelete.id);
      this.conceptToDelete = null;
    }
    this.showDeleteDialog = false;
  }

  // Annuler la suppression
  cancelDelete(): void {
    this.conceptToDelete = null;
    this.showDeleteDialog = false;
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