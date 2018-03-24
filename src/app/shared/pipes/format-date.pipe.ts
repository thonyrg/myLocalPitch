import { PipeTransform, Pipe } from "@angular/core";
import * as moment from 'moment';

@Pipe({
    name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
    transform(value: any) {
        return moment(value).format('HH:mm DD/MM/YY');
    }
}