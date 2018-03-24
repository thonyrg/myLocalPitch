import { CalculateDurationPipe } from './calculate-duration.pipe';

describe('CalculateDurationPipe', () => {
    let pipe: CalculateDurationPipe;

    beforeEach(() => {
        pipe = new CalculateDurationPipe();
    });

    it('should return the duration in hours and minutes between two dates', () => {
        expect(pipe.transform("2018-01-09T06:40:00+00:00","2018-01-09T08:40:00+00:00")).toBe("2 hours 0 minute");
        expect(pipe.transform("2018-01-09T06:40:00+00:00","2018-01-09T07:00:00+00:00")).toBe("20 minutes");
    });

});