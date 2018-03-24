import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PitchesService } from './pitches.service';

describe(`PitchesService`, () => {

    let http: HttpTestingController;
    let service: PitchesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PitchesService]
        });
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    it(`should successfully get the list of slots available`, inject([HttpTestingController, PitchesService],
        (httpMock: HttpTestingController, service: PitchesService) => {
          // We call the service
          service.getPitchesAvailability('32990', '2018-01-09', '2018-01-15').subscribe(data => {
            expect(data.data.length).toBe(1);
            expect(data.data[0].type).toBe('slots');
            expect(data.data[0].attributes.price).toBe('12.05');
          });
          // We set the expectations for the HttpClient mock
          const req = httpMock.expectOne('https://api-v2.mylp.info/pitches/32990/slots?filter[starts]=2018-01-09&filter[ends]=2018-01-15');
          expect(req.request.method).toEqual('GET');
          // Then we set the fake data to be returned by the mock
          req.flush({data: [
            {
                "type": "slots",
                "id": "446269",
                "attributes": {
                    "starts": "2018-01-09T06:40:00+00:00",
                    "ends": "2018-01-09T07:20:00+00:00",
                    "price": "12.05",
                    "admin_fee": "0.00",
                    "currency": "GBP",
                    "availabilities": 0
                }
            }
          ]});
        })
    );
});