import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-taxonomy-slider',
  templateUrl: './taxonomy-slider.component.html',
  styleUrls: ['./taxonomy-slider.component.scss'],
})
export class TaxonomySliderComponent implements OnInit {

	@Input() terms: any[];
	loading: boolean;
	slideOpts = {
		initialSlide: 0,
		speed: 400,
		spaceBetween: 15,
		slidesPerView: 2.5
	};

	constructor() {
		this.loading = true;
	}

	ngOnInit(){
		
	}

}
