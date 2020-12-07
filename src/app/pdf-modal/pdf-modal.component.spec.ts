import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfModalComponent } from './pdf-modal.component';

describe('PdfModalComponent', () => {
  let component: PdfModalComponent;
  let fixture: ComponentFixture<PdfModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
