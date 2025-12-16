import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

export interface CodeBlock {
  label: string;
  blocks: string[];
}

export interface Card {
  id: number;
  title: string;
  description: string;
  examples: CodeBlock[];
  summary: string;
}

export interface Chapter {
  chapterId: number;
  chapterTitle: string;
  cards: Card[];
}

export interface Concept {
  id: number;
  title: string;
  description: string;
  blocks: string[];
  codeParts?: string[];
  chapterId?: number;
  chapterTitle?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConceptService {

  private jsonUrl = 'assets/data/concepts.json';

  private chapters$ = new BehaviorSubject<Chapter[]>([]);
  private concepts$ = new BehaviorSubject<Concept[]>([]);

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData() {
    this.http.get<Chapter[]>(this.jsonUrl).subscribe(chapters => {
      this.chapters$.next(chapters);
      
      // Transformer les chapitres en liste plate de concepts
      const allConcepts: Concept[] = [];
      chapters.forEach(chapter => {
        chapter.cards.forEach(card => {
          const concept: Concept = {
            id: card.id,
            title: card.title,
            description: card.description,
            blocks: card.examples.flatMap(example => example.blocks),
            codeParts: card.examples.flatMap(example => example.blocks),
            chapterId: chapter.chapterId,
            chapterTitle: chapter.chapterTitle
          };
          allConcepts.push(concept);
        });
      });
      this.concepts$.next(allConcepts);
    });
  }

  // Méthodes pour les chapitres
  getAllChapters(): Observable<Chapter[]> {
    return this.chapters$.asObservable();
  }

  getChapterById(chapterId: number): Observable<Chapter | undefined> {
    return this.getAllChapters().pipe(
      map(chapters => chapters.find(c => c.chapterId === chapterId))
    );
  }

  getConceptsByChapter(chapterId: number): Observable<Card[]> {
    return this.getAllChapters().pipe(
      map(chapters => {
        const chapter = chapters.find(c => c.chapterId === chapterId);
        return chapter ? chapter.cards : [];
      })
    );
  }

  // Méthodes pour les concepts (compatibilité avec l'ancienne interface)
  getAll(): Observable<Concept[]> {
    return this.concepts$.asObservable();
  }

  getById(id: number): Observable<Concept | undefined> {
    return this.getAll().pipe(
      map(list => list.find(c => c.id === id))
    );
  }

  getByChapterId(chapterId: number): Observable<Concept[]> {
    return this.getAll().pipe(
      map(list => list.filter(c => c.chapterId === chapterId))
    );
  }

  // Méthodes de gestion (vous devrez les adapter pour gérer la structure par chapitres)
  addConcept(concept: Concept) {
    const current = this.concepts$.value;
    this.concepts$.next([...current, concept]);
  }

  deleteConcept(id: number) {
    const filtered = this.concepts$.value.filter(c => c.id !== id);
    this.concepts$.next(filtered);
  }

  updateConcept(updated: Concept) {
    const updatedList = this.concepts$.value.map(c =>
      c.id === updated.id ? updated : c
    );
    this.concepts$.next(updatedList);
  }

  // Méthodes pour ajouter/supprimer des chapitres
  addChapter(chapter: Chapter) {
    const current = this.chapters$.value;
    this.chapters$.next([...current, chapter]);
  }

  deleteChapter(chapterId: number) {
    const filtered = this.chapters$.value.filter(c => c.chapterId !== chapterId);
    this.chapters$.next(filtered);
  }

  updateChapter(updated: Chapter) {
    const updatedList = this.chapters$.value.map(c =>
      c.chapterId === updated.chapterId ? updated : c
    );
    this.chapters$.next(updatedList);
  }

  // Méthode pour ajouter une carte à un chapitre
  addCardToChapter(chapterId: number, card: Card) {
    const chapters = this.chapters$.value;
    const chapterIndex = chapters.findIndex(c => c.chapterId === chapterId);
    
    if (chapterIndex !== -1) {
      const updatedChapters = [...chapters];
      updatedChapters[chapterIndex] = {
        ...updatedChapters[chapterIndex],
        cards: [...updatedChapters[chapterIndex].cards, card]
      };
      this.chapters$.next(updatedChapters);
    }
  }

  // Méthode pour supprimer une carte d'un chapitre
  deleteCardFromChapter(chapterId: number, cardId: number) {
    const chapters = this.chapters$.value;
    const chapterIndex = chapters.findIndex(c => c.chapterId === chapterId);
    
    if (chapterIndex !== -1) {
      const updatedChapters = [...chapters];
      updatedChapters[chapterIndex] = {
        ...updatedChapters[chapterIndex],
        cards: updatedChapters[chapterIndex].cards.filter(c => c.id !== cardId)
      };
      this.chapters$.next(updatedChapters);
    }
  }
}