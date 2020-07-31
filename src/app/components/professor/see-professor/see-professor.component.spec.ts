import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProfessorComponent } from './see-professor.component';

describe('SeeProfessorComponent', () => {
  let component: SeeProfessorComponent;
  let fixture: ComponentFixture<SeeProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
