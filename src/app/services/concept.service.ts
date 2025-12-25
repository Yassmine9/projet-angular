import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, of, tap } from 'rxjs';

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

const STORAGE_KEY = 'java-concepts-chapters';

@Injectable({
  providedIn: 'root'
})
export class ConceptService {
  private jsonUrl = 'assets/data/concepts.json';

  private chapters$ = new BehaviorSubject<Chapter[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    // 1. Try to load from localStorage first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.chapters$.next(parsed);
        return;
      } catch (e) {
        console.warn('Failed to parse saved data, falling back to JSON file');
      }
    }

    // 2. If nothing in localStorage → load from JSON
    this.http.get<Chapter[]>(this.jsonUrl).subscribe(chapters => {
      this.chapters$.next(chapters);
      this.saveToStorage(); // save initial data once
    });
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.chapters$.value));
  }

  // ====================== PUBLIC OBSERVABLES ======================

  getAllChapters(): Observable<Chapter[]> {
    return this.chapters$.asObservable();
  }

  getChapterById(chapterId: number): Observable<Chapter | undefined> {
    return this.chapters$.pipe(map(chapters => chapters.find(c => c.chapterId === chapterId)));
  }

  // Flat list for backward compatibility (derived from chapters)
  getAllConcepts(): Observable<Concept[]> {
    return this.chapters$.pipe(
      map(chapters => {
        const all: Concept[] = [];
        chapters.forEach(chapter => {
          chapter.cards.forEach(card => {
            all.push({
              id: card.id,
              title: card.title,
              description: card.description,
              blocks: card.examples.flatMap(ex => ex.blocks),
              codeParts: card.examples.flatMap(ex => ex.blocks),
              chapterId: chapter.chapterId,
              chapterTitle: chapter.chapterTitle
            });
          });
        });
        return all;
      })
    );
  }

  getById(id: number): Observable<Concept | undefined> {
    return this.getAllConcepts().pipe(map(list => list.find(c => c.id === id)));
  }

  // ====================== MUTATIONS (always update chapters$ + storage) ======================

  addConcept(concept: Concept): void {
    const chapters = this.chapters$.value;
    const chapter = chapters.find(c => c.chapterId === concept.chapterId);

    if (!chapter) {
      console.error('Chapter not found for ID:', concept.chapterId);
      return;
    }

    const newCard: Card = {
      id: concept.id,
      title: concept.title,
      description: concept.description,
      summary: concept.description,
      examples: [{
        label: 'Exemple',
        blocks: concept.blocks
      }]
    };

    chapter.cards.push(newCard);

    this.chapters$.next([...chapters]); // trigger change detection
    this.saveToStorage();
  }

  updateConcept(updatedConcept: Concept): void {
    const chapters = [...this.chapters$.value];

    let found = false;
    for (const chapter of chapters) {
      const cardIndex = chapter.cards.findIndex(c => c.id === updatedConcept.id);
      if (cardIndex !== -1) {
        chapter.cards[cardIndex] = {
          ...chapter.cards[cardIndex],
          title: updatedConcept.title,
          description: updatedConcept.description,
          summary: updatedConcept.description,
          examples: [{
            label: 'Exemple',
            blocks: updatedConcept.blocks
          }]
        };
        found = true;
        break;
      }
    }

    if (found) {
      this.chapters$.next(chapters);
      this.saveToStorage();
    }
  }

  deleteCardFromChapter(chapterId: number, cardId: number): void {
    const chapters = this.chapters$.value.map(chapter => {
      if (chapter.chapterId === chapterId) {
        return {
          ...chapter,
          cards: chapter.cards.filter(c => c.id !== cardId)
        };
      }
      return chapter;
    });

    this.chapters$.next(chapters);
    this.saveToStorage();
  }

  // You can keep deleteConcept for compatibility
  deleteConcept(id: number) {
    // We don't know the chapterId here → remove from all chapters
    const chapters = this.chapters$.value.map(chapter => ({
      ...chapter,
      cards: chapter.cards.filter(c => c.id !== id)
    }));

    this.chapters$.next(chapters);
    this.saveToStorage();
  }
}