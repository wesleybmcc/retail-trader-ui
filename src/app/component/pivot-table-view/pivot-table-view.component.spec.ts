import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotTableViewComponent } from './pivot-table-view.component';

describe('PivotTableViewComponent', () => {
  let component: PivotTableViewComponent;
  let fixture: ComponentFixture<PivotTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PivotTableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
