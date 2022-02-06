import { Instrument } from "./instrument";

export interface BidAsk {
    instrument: Instrument;
    bid: number;
    ask: number;
}

export interface OHLC {
    open: number;
    high: number;
    low: number;
    close: number;
}

export class BidAskResponse {

    private _startDateTime: Date;
    private _endDateTime: Date;
    private _bid: OHLC;
    private _ask: OHLC;
    private _instrument: string;
    private _volume: number;

    get startDateTime(): Date { return this._startDateTime; }
    get endDateTime(): Date { return this._endDateTime; }
    get bid(): OHLC {return this._bid; }
    get ask(): OHLC { return this._ask; }
    get instrument() { return this._instrument; }
    get volume() { return this._volume; }
    
    constructor(serverData: string) {
        const bidAskResponse: any = JSON.parse(serverData);
        this._instrument = bidAskResponse['Instrument'].replace('_', '/');
        this._volume = bidAskResponse['Volume'];
        this._startDateTime = new Date(bidAskResponse['Bid']['StartDateTime']);
        this._endDateTime = new Date(bidAskResponse['Bid']['EndDateTime']);
        this._bid = { open: bidAskResponse['Bid']['Open'], high: bidAskResponse['Bid']['High'], low: bidAskResponse['Bid']['Low'], close: bidAskResponse['Bid']['Close']};
        this._ask = { open: bidAskResponse['Ask']['Open'], high: bidAskResponse['Ask']['High'], low: bidAskResponse['Ask']['Low'], close: bidAskResponse['Ask']['Close']};
    }
}