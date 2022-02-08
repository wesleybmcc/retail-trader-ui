import { Injectable, EventEmitter } from '@angular/core';
import { Instrument, InstrumentType } from '../model/instrument';
import { BidAsk } from '../model/price';
import { InstrumentService } from './instrument.service';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';
import { BidAskMessage } from '../model/bidAskMessage';

@Injectable({
  providedIn: 'root'
})
export class LivePriceService {
  instruments: Instrument[] = [];
  instrumentTypes: InstrumentType[] = [];
  bidAsks: BidAsk[] = [];
  messageQueueEventEmitter: EventEmitter<BidAskMessage> = new EventEmitter<BidAskMessage>();
  
  constructor(private instrumentService: InstrumentService) {
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

    connection.on("SendMessage", (data: string, message: string) => {      
      const dataSplit: string[] = message.split(' ');
      const bidAskMessage: BidAskMessage = {symbol: dataSplit[0], isBid: dataSplit[1].toLowerCase() === 'bid', value: parseFloat(dataSplit[2])};
      this.messageQueueEventEmitter.emit(bidAskMessage);
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
