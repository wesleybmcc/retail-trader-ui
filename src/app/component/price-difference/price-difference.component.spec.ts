import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDifferenceComponent } from './price-difference.component';

describe('PriceDifferenceComponent', () => {
  let component: PriceDifferenceComponent;
  let fixture: ComponentFixture<PriceDifferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceDifferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
