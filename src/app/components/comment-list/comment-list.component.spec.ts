import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
	let component: CommentListComponent;
	let fixture: ComponentFixture<CommentListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CommentListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CommentListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
