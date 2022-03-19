import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomySliderComponent } from './taxonomy-slider.component';

describe('TaxonomySliderComponent', () => {
	let component: TaxonomySliderComponent;
	let fixture: ComponentFixture<TaxonomySliderComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [TaxonomySliderComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TaxonomySliderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
