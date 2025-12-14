import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptDetails } from './concept-details';

describe('ConceptDetails', () => {
  let component: ConceptDetails;
  let fixture: ComponentFixture<ConceptDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
