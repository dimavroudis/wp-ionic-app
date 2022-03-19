import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardComponent } from './post-card.component';

describe('PostCardComponent', () => {
	let component: PostCardComponent;
	let fixture: ComponentFixture<PostCardComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [PostCardComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PostCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
