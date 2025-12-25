import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptService, Concept } from '../services/concept.service';

@Component({
  selector: 'app-concept-form',
  templateUrl: './concept-form.html',
  styleUrls: ['./concept-form.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ConceptFormComponent implements OnInit {
  concept: Concept = {
    id: 0,
    title: '',
    description: '',
    blocks: [''],
    chapterId: 1 // You can make this dynamic later with a <select>
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conceptService: ConceptService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    if (id) {
      this.conceptService.getById(id).subscribe(existing => {
        if (existing) {
          this.concept = { ...existing };
          // Ensure blocks is always an array with at least one empty string
          if (!this.concept.blocks || this.concept.blocks.length === 0) {
            this.concept.blocks = [''];
          }
          this.isEdit = true;
        }
      });
    }
  }

  // ================ SAVE ================
  save() {
    if (!this.concept.title?.trim()) {
      alert('Le titre est obligatoire');
      return;
    }
    if (!this.concept.description?.trim()) {
      alert('La description est obligatoire');
      return;
    }

    // Clean up blocks: trim and remove empty ones
    this.concept.blocks = this.concept.blocks
      .map(b => b.trim())
      .filter(b => b !== '');

    if (this.concept.blocks.length === 0) {
      alert('Ajoutez au moins un bloc de code');
      return;
    }

    if (this.isEdit) {
      // Update existing concept
      this.conceptService.updateConcept(this.concept);
    } else {
      // Create new concept
      this.concept.id = Date.now(); // Simple unique ID
      this.conceptService.addConcept(this.concept);
    }

    // Go back to list
    this.router.navigate(['/concepts']);
  }

  // ================ BLOCK MANAGEMENT ================
  addBlock() {
    this.concept.blocks.push('');
  }

  removeBlock(index: number) {
    if (this.concept.blocks.length > 1) {
      this.concept.blocks.splice(index, 1);
    } else {
      alert('Vous devez garder au moins un bloc');
    }
  }

  // ================ CANCEL ================
  cancel() {
    if (confirm('Voulez-vous vraiment annuler ? Les modifications non enregistrées seront perdues.')) {
      this.router.navigate(['/concepts']);
    }
  }
}