import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazosComponent } from './plazos.component';

describe('PlazosComponent', () => {
  let component: PlazosComponent;
  let fixture: ComponentFixture<PlazosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlazosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
