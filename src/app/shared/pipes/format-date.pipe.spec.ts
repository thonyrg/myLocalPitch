import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
    let pipe: FormatDatePipe;

    beforeEach(() => {
        pipe = new FormatDatePipe();
    });

    it('should return a date in a format hh:mm DD/MM/YY', () => {
        expect(pipe.transform('2018-01-09T06:40:00+00:00')).toBe('06:40 09/01/18');
        expect(pipe.transform('2018-01-09T13:20:00+00:00')).toBe('13:20 09/01/18');
    });
});