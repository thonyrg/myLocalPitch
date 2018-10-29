import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PitchSlot } from './../../components/search/search-results/pitch-slot.model';
import * as settings from '../../app.settings';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class PitchesService {

  searchResults: BehaviorSubject<PitchSlot[]> = new BehaviorSubject<PitchSlot[]>([]);
  showNoResults: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  // Creates the URL as both start date and end date are optional
  getUrl(pitchId: string, startDate: string, endDate: string) {
    let url = '';
    if (startDate && endDate) {
      url = `${settings.pitchesBaseUrl}${pitchId}/slots?filter[starts]=${startDate}&filter[ends]=${endDate}`;
    } else if (!startDate && !endDate) {
      url = `${settings.pitchesBaseUrl}${pitchId}/slots`;
    } else if (startDate && !endDate) {
      url = `${settings.pitchesBaseUrl}${pitchId}/slots?filter[starts]=${startDate}`;
    } else if (!startDate && endDate) {
      url = `${settings.pitchesBaseUrl}${pitchId}/slots?filter[ends]=${endDate}`;
    }
    return url;
  }

  // Fetch pitches according to the filter
  getPitchesAvailability(pitchId: string, startDate: string, endDate: string) {
    return this.httpClient.get(this.getUrl(pitchId, startDate, endDate));
  }

  // Update searchResults
  onUpdateSearchResults(newResults: PitchSlot[]) {
    this.searchResults.next(newResults);
  }

  onShowNoResults(newValue) {
    this.showNoResults.next(newValue);
  }

}
