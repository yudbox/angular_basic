import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesTransformingComponent } from './pipes-transforming.component';

describe('PipesTransformingComponent', () => {
  let component: PipesTransformingComponent;
  let fixture: ComponentFixture<PipesTransformingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipesTransformingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipesTransformingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
