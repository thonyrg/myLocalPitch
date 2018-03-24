export class PitchSlot {
    slotId: string;
    startDate: string;
    endDate: string;
    priceGbp: string;
    availabilities: number;

    constructor(sId: string = '', sDate: string = '', eDate: string = '', pGbp: string = '', aval: number = 0) {
        this.slotId = sId;
        this.startDate = sDate;
        this.endDate = eDate;
        this.priceGbp = pGbp;
        this.availabilities = aval;
    }
}