import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAddComponent } from './admin-product-add.component';

describe('AdminProductAddComponent', () => {
  let component: AdminProductAddComponent;
  let fixture: ComponentFixture<AdminProductAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductAddComponent]
    });
    fixture = TestBed.createComponent(AdminProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
