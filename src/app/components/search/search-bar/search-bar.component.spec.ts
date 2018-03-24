import { SearchBarComponent } from './search-bar.component';
import { HttpClient } from '@angular/common/http';
import { PitchesService } from './../../../shared/services/pitches.service';

describe('SearchBarComponent', () => {
    let component: SearchBarComponent;
    let service: PitchesService;
    let http: HttpClient;

    beforeEach(() => {
        service = new PitchesService(http);
        component = new SearchBarComponent(service);
    });

    afterEach(() => {
        service = null;
        component = null;
    });

    it('should return false if the dates diffenrece are inside the range', () => {
        expect(component.isDatesOutsideRange('2018-01-09', '2018-01-15', 14)).toBeFalsy();
    });

    it('should return true if the dates diffenrece are outside the range', () => {
        expect(component.isDatesOutsideRange('2018-01-09', '2018-01-30', 14)).toBeTruthy();
    });

    it('should return true if date is valid', () => {
        expect(component.isValidDate('2018-01-09')).toBeTruthy();
    });

    it('should return false if date is invalid', () => {
        expect(component.isValidDate('Test invalid date')).toBeFalsy();
    });

    it('should return true if start date is greater than end date', () => {
        expect(component.isStartDateGreaterThanEndDate('2018-01-15', '2018-01-09')).toBeTruthy();
    });

    it('should return false if start date is smaller than end date', () => {
        expect(component.isStartDateGreaterThanEndDate('2018-01-09', '2018-01-15')).toBeFalsy();
    });
})