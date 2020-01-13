import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
	selector: 'app-intro',
	templateUrl: './intro.page.html',
	styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
	domain: string = 'dimitrismavroudis.gr/test';
	setupForm: FormGroup;
	isInvalid: boolean;

	constructor(private api: ApiService, private navCtrl: NavController, private settings: SettingsService) { }

	ngOnInit() {
		this.setupForm = new FormGroup({
			domain: new FormControl(this.domain ? this.domain : '', [Validators.required]),
		});
	}


	submit() {
		this.api.setDomain(this.setupForm.value.domain).subscribe(isValid => {
			this.isInvalid = !isValid;
			this.settings.getAppInfo().subscribe();
			if (isValid) {
				this.navCtrl.navigateForward('/tabs');
			}
		})
	}

}
