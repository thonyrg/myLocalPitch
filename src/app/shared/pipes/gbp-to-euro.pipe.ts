import { PipeTransform, Pipe } from "@angular/core";
import * as moment from 'moment';
import * as settings from  '../../app.settings';

@Pipe({
    name: 'exchangeGbpToEuro'
})
export class GbpToEuroPipe implements PipeTransform {
    transform(value: any) {
        return (value * settings.gbpToEurRate).toFixed(2);
    }
}