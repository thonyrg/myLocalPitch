import { PitchSlot } from './../search-results/pitch-slot.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { PitchesService } from './../../../shared/services/pitches.service';
import * as settings from '../../../app.settings';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  errorMsg: string = '';

  constructor(private service: PitchesService) {}

  // Check if date is valid
  isValidDate(dt) {
    return moment(dt, 'YYYY-MM-DD').isValid();
  }

  // Check if start date is greater than end date
  isStartDateGreaterThanEndDate(sd, ed) {
    return moment(sd).isAfter(moment(ed));
  }

  // Check if the difference in days between two dates is smaller than or equal the nDays passed by parameter
  isDatesWithinRange(sd, ed, nDays) {
    return moment(ed).diff(moment(sd), 'days') > nDays;
  }

  checkDateRange(form: NgForm) {
    const f = form.value;
    let sd = f.startDate || '';
    let ed = f.endDate || '';

    /*
      Validation:
      - To verify if the start date is valid
    */
   if(sd) {
      if(!this.isValidDate(sd)) {
        this.errorMsg = 'Start date is not a valid date';
        return false;
      }
    }

    /*
      Validation:
      - To verify if the end date is valid
    */
    if(ed) {
      if(!this.isValidDate(ed)) {
        this.errorMsg = 'End date is not a valid date';
        return false;
      }
    }

    /*
      Validations:
      - Start date is greater than end date
      - Date range is more than 14 days
    */
    if(sd && ed) {
      // Fallback for browsers that doesn't support input type="date"
      if(sd.indexOf('/') > -1) {
        sd = moment(sd).format('YYYY-MM-DD');
      }
      if(ed.indexOf('/') > -1) {
        ed = moment(ed).format('YYYY-MM-DD');
      }

      if(this.isStartDateGreaterThanEndDate(sd, ed)) {
        this.errorMsg = 'Start date cannot be greater than end date';
        return false;
      }

      if(this.isDatesWithinRange(sd, ed, settings.maxDateDifference)) {
        this.errorMsg = `Date range cannot be greater than ${settings.maxDateDifference} days`;
        return false;
      }
    }

    this.errorMsg = '';
    this.doSearch(form);

  }

  doSearch(form: NgForm) {
    const f = form.value;
    let mappedSlots: PitchSlot[] = [];
    this.service.getPitchesAvailability(f.pitchId, f.startDate, f.endDate)
    .subscribe((results: any) => {
      const resData = results.data;
      resData.map(res => {
        let aux = {
          slotId: res.id,
          startDate: res.attributes.starts,
          endDate: res.attributes.ends,
          priceGbp: res.attributes.price,
          availabilities: res.attributes.availabilities
        };
        mappedSlots.push(aux);
      });
      this.service.onUpdateSearchResults(mappedSlots);
    });
  }
}
