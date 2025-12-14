import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map , of  } from 'rxjs';

export interface Concept {
  id: number;
  title: string;
  description: string;
  blocks : string[];
  codeParts?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ConceptService {
  //private url = '/assets/data/concepts.json';

  constructor(private http: HttpClient) {}
  private concepts: Concept[] = [
    { id: 1, title: 'If / Else', description: 'Structure conditionnelle', blocks: ['if', 'else'] },
    { id: 2, title: 'For Loop', description: 'Boucle for', blocks: ['for init', 'condition', 'incrément'] },
    { id: 3, title: 'While Loop', description: 'Boucle while', blocks: ['while condition', 'body'] }
  ];
   getAll(): Observable<Concept[]> {
    return of(this.concepts);
  }

  getById(id: number): Observable<Concept | undefined> {
    return this.getAll().pipe(
      map(list => list.find(c => c.id === id))
    );
  }

delete(id : number){
  this.concepts = this.concepts.filter(c => c.id !== id);
}
}

