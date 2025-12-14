import { Component , OnInit } from '@angular/core';
import { ConceptService, Concept } from '../concept.service' ;
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-concept-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './concept-list.html',
  styleUrls: ['./concept-list.css'],
})
export class ConceptList implements OnInit {
  concepts: Concept[] = [];

  constructor(private conceptService: ConceptService) {}

  ngOnInit(): void {
    this.conceptService.getAll().subscribe(concepts => {
      this.concepts = concepts;
    });
  }
  deleteConcept(id: number) {
  if (confirm('Voulez-vous vraiment supprimer ce concept ?')) {
    this.conceptService.delete(id);

    this.concepts = this.concepts.filter(c => c.id !== id);
  }
}
}