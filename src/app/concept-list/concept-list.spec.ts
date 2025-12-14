import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptList } from './concept-list';

describe('ConceptList', () => {
  let component: ConceptList;
  let fixture: ComponentFixture<ConceptList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
