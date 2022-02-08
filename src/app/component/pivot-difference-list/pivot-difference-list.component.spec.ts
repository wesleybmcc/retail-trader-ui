import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotDifferenceListComponent } from './pivot-difference-list.component';

describe('PivotDifferenceListComponent', () => {
  let component: PivotDifferenceListComponent;
  let fixture: ComponentFixture<PivotDifferenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PivotDifferenceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotDifferenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
