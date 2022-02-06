import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotListComponent } from './pivot-list.component';

describe('PivotListComponent', () => {
  let component: PivotListComponent;
  let fixture: ComponentFixture<PivotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PivotListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
