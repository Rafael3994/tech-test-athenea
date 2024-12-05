import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUserPageComponent } from './details-user-page.component';

describe('DetailsUserPageComponent', () => {
  let component: DetailsUserPageComponent;
  let fixture: ComponentFixture<DetailsUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsUserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
