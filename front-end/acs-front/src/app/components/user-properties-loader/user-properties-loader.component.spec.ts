import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPropertiesLoaderComponent } from './user-properties-loader.component';

describe('UserPropertiesLoaderComponent', () => {
  let component: UserPropertiesLoaderComponent;
  let fixture: ComponentFixture<UserPropertiesLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPropertiesLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPropertiesLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
