import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ConceptService, Concept } from '../services/concept.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, DragDropModule, RouterModule],
  templateUrl: './game.html',
  styleUrls: ['./game.css']
})
export class GameComponent implements OnInit {
  concept?: Concept;
  
  // Original correct order
  correctBlocks: string[] = [];
  
  // Shuffled blocks (source)
  shuffledBlocks: string[] = [];
  
  // Assembled blocks (target area)
  assembledBlocks: string[] = [];
  
  // Game state
  isComplete: boolean = false;
  isCorrect: boolean = false;
  showFeedback: boolean = false;
  attempts: number = 0;
  showHint: boolean = false;
  
  // Progress tracking
  get progress(): number {
    if (this.correctBlocks.length === 0) return 0;
    return Math.round((this.assembledBlocks.length / this.correctBlocks.length) * 100);
  }
  
  get canVerify(): boolean {
    return this.assembledBlocks.length > 0;
  }

  constructor(
    private route: ActivatedRoute,
    private conceptService: ConceptService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.conceptService.getById(id).subscribe(c => {
      if (c) {
        this.concept = c;
        this.correctBlocks = [...c.blocks];
        this.shuffledBlocks = this.shuffleArray([...c.blocks]);
      }
    });
  }

  // Shuffle array using Fisher-Yates algorithm
  private shuffleArray(array: string[]): string[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Handle drop event
  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      // Reorder within same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Transfer between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    
    // Reset feedback when user makes changes
    this.showFeedback = false;
    this.showHint = false;
  }

  // Verify if the assembled order is correct
  verifyOrder(): void {
    if (this.assembledBlocks.length === 0) {
      return;
    }

    this.attempts++;
    this.isComplete = this.assembledBlocks.length === this.correctBlocks.length;
    
    if (this.isComplete) {
      // Check if order matches
      this.isCorrect = this.assembledBlocks.every(
        (block, index) => block === this.correctBlocks[index]
      );
    } else {
      this.isCorrect = false;
    }
    
    this.showFeedback = true;
    
    // Auto-hide feedback after 5 seconds for non-success messages
    if (!this.isCorrect) {
      setTimeout(() => {
        this.showFeedback = false;
      }, 5000);
    }
  }

  // Show hint - reveal first correct block position
  toggleHint(): void {
    this.showHint = !this.showHint;
  }
  
  // Get hint message
  getHintMessage(): string {
    if (this.assembledBlocks.length === 0) {
      return `💡 Indice : Le premier bloc devrait être "${this.correctBlocks[0]}"`;
    }
    
    // Find first incorrect position
    for (let i = 0; i < this.assembledBlocks.length; i++) {
      if (this.assembledBlocks[i] !== this.correctBlocks[i]) {
        return `💡 Indice : Le bloc à la position ${i + 1} n'est pas correct. Il devrait être "${this.correctBlocks[i]}"`;
      }
    }
    
    return `💡 Indice : Continue, tu es sur la bonne voie ! Il manque ${this.correctBlocks.length - this.assembledBlocks.length} bloc(s).`;
  }

  // Check if a specific block in assembly is in correct position
  isBlockCorrect(index: number): boolean {
    return this.assembledBlocks[index] === this.correctBlocks[index];
  }

  // Reset the game
  resetGame(): void {
    this.shuffledBlocks = this.shuffleArray([...this.correctBlocks]);
    this.assembledBlocks = [];
    this.showFeedback = false;
    this.isComplete = false;
    this.isCorrect = false;
    this.showHint = false;
    this.attempts = 0;
  }
  
  // Give up and show solution
  showSolution(): void {
    if (confirm('Es-tu sûr(e) de vouloir voir la solution ? Le jeu sera réinitialisé.')) {
      this.assembledBlocks = [...this.correctBlocks];
      this.shuffledBlocks = [];
      this.isComplete = true;
      this.isCorrect = true;
      this.showFeedback = true;
      this.showHint = false;
    }
  }
}