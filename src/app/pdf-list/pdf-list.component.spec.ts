import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfListComponent } from './pdf-list.component';

describe('PdfListComponent', () => {
  let component: PdfListComponent;
  let fixture: ComponentFixture<PdfListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
