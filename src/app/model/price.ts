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
