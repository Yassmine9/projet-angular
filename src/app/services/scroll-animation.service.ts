
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observer!: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  init() {

    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });


    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
        this.observer.observe(card);
      });
    }, 300);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}