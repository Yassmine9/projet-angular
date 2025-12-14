import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ConceptService, Concept } from '../concept.service';

@Component({
  selector: 'app-concept-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './concept-details.html',
  styleUrls: ['./concept-details.css']
})
export class ConceptDetails implements OnInit {
  concept?: Concept;

  constructor(
    private route: ActivatedRoute,
    private conceptService: ConceptService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.conceptService.getById(id).subscribe(c => {
      this.concept = c;
    });
  }
}
