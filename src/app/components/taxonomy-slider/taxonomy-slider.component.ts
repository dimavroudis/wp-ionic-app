import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaxonomyService } from 'src/app/services/taxonomy.service';
import { Term } from 'src/app/models/wordpress';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
	selector: 'app-taxonomy-slider',
	templateUrl: './taxonomy-slider.component.html',
	styleUrls: ['./taxonomy-slider.component.scss'],
})
export class TaxonomySliderComponent implements OnInit {

	@Input() taxonomy: string;
	@Input() terms: Term[];
	@Input() selectedTerm: number;
	@Output() termSelected = new EventEmitter();

	slideOpts = {
		initialSlide: 0,
		speed: 400,
		spaceBetween: 0,
		slidesPerView: 'auto',
		slideToClickedSlide: true,
		centeredSlides: true,
		centeredSlidesBounds: true
	};

	constructor(private taxonomyService: TaxonomyService, private settingsService: SettingsService) { }

	ngOnInit() {
		this.taxonomyService.featuredCategories.subscribe(featuredCategories => {
			if (featuredCategories && featuredCategories.length) {
				this.terms = featuredCategories.filter(term => term.count > 0);
			}
		});
	}

	selectTerm(term?: Term) {
		this.selectedTerm = term ? term.id : 0;
		this.termSelected.emit(term);
	}

}
