import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPage } from './search.page';

describe('SearchPage', () => {
	let component: SearchPage;
	let fixture: ComponentFixture<SearchPage>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SearchPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
