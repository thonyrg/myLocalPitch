import { itemsPerPage } from './../../../app.settings';
import { Component, OnInit } from '@angular/core';
import { PitchSlot } from './pitch-slot.model';
import { PitchesService } from '../../../shared/services/pitches.service';
import * as settings from  '../../../app.settings';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = settings.itemsPerPage;
  resultsList: PitchSlot[] = [];
  showNoResults: boolean = false;

  constructor(private service: PitchesService) { }

  ngOnInit() {
    this.service.showNoResults
      .subscribe(val => this.showNoResults = val);

    this.service.searchResults
      .subscribe(results => {
        this.resultsList = results;
      });
  }

}
