import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionProfessorComponent } from './action-professor.component';

describe('ActionProfessorComponent', () => {
  let component: ActionProfessorComponent;
  let fixture: ComponentFixture<ActionProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
