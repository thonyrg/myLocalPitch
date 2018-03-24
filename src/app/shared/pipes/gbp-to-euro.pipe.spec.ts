import { GbpToEuroPipe } from './gbp-to-euro.pipe';

describe('GbpToEuroPipe', () => {
    let pipe: GbpToEuroPipe;

    beforeEach(() => {
        pipe = new GbpToEuroPipe();
    });

    it('should convert from GBP to EURO in a rate set in the settings file', () => {
        expect(pipe.transform('9.00')).toBe('10.17');
        expect(pipe.transform('10.12')).toBe('11.44');
    });
});