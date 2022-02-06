import { Component, OnInit, Input } from '@angular/core';
import { PriceWatchService } from 'src/app/service/price-watch.service';
import { BidAsk, BidAskResponse } from '../../model/price';


@Component({
  selector: 'app-bid-ask',
  templateUrl: './bid-ask.component.html',
  styleUrls: ['./bid-ask.component.css']
})
export class BidAskComponent implements OnInit {
  @Input() symbol: string = '';
  @Input() description: string = '';
  
  bid: number = 0;
  ask: number = 0;
  
  constructor(private priceWatchService: PriceWatchService) { }

  ngOnInit(): void {
    this.priceWatchService.priceWatchEventEmitter.subscribe((bidAskResponse: BidAskResponse) => {
      if(this.symbol === bidAskResponse.instrument) {
        this.bid = bidAskResponse.bid.close;
        this.ask = bidAskResponse.ask.close;
      }
    });
  }

}
