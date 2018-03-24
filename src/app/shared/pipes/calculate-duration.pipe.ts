import { PipeTransform, Pipe } from "@angular/core";
import * as moment from 'moment';

@Pipe({
    name: 'calculateDuration'
})
export class CalculateDurationPipe implements PipeTransform {
    transform(value: any, endDate: string) {
        const durationInMinutes = moment.duration(moment(endDate).diff(moment(value))).asMinutes();
        let hours = 0;
        let minutes = 0;
        let formattedDuration = '';

        // Getting the number of hours
        if(durationInMinutes > 59) {
            hours = Math.floor(durationInMinutes/60);
        } else {
            hours = 0;
        }

        // Getting the number of minutes
        if(hours > 0) {
            minutes = durationInMinutes - (hours*60);
        } else {
            minutes = durationInMinutes;
        }

        // Formatting the value to be returned
        if (hours > 1) {
            formattedDuration += hours + ' hours ';
        } else if(hours === 1) {
            formattedDuration += hours + ' hour ';
        }

        if(minutes > 1) {
            formattedDuration += minutes + ' minutes';
        } else {
            formattedDuration += minutes + ' minute';
        }

        return formattedDuration;
    }
}