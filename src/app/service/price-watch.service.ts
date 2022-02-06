import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Instrument, InstrumentType } from '../model/instrument';
import { BidAsk, BidAskResponse, OHLC } from '../model/price';
import { InstrumentService } from './instrument.service';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';
import { LivePriceService } from './live-price.service';

@Injectable({
  providedIn: 'root'
})
export class PriceWatchService {
  instruments: Instrument[] = [];
  instrumentTypes: InstrumentType[] = [];
  bidAsks: BidAsk[] = [];
  priceWatchEventEmitter: EventEmitter<BidAskResponse> = new EventEmitter<BidAskResponse>();
  
  constructor(private instrumentService: InstrumentService,
    private livePriceService: LivePriceService) {
    this.loadData();
    
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.socketUrl + 'notify')
      .build();

      console.log(environment.socketUrl);
    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("SendMessage", (data: string, bidAskResponseJSON: string) => {
      const bidAskResponse: BidAskResponse = new BidAskResponse(bidAskResponseJSON);
      this.priceWatchEventEmitter.emit(bidAskResponse);
    });

    this.livePriceService.start().subscribe((data:any) => {
    });
  }

  public loadData() {
    this.instrumentService.getInstruments().subscribe((instruments: Instrument[]) => {
      this.instruments = instruments;
    });
    this.instrumentService.getInstrumentTypes().subscribe((instrumentTypes: InstrumentType[]) => {
      this.instrumentTypes = instrumentTypes;
    });
  }

}
