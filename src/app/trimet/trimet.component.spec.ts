import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimetComponent } from './trimet.component';

describe('TrimetComponent', () => {
  let component: TrimetComponent;
  let fixture: ComponentFixture<TrimetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrimetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrimetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
