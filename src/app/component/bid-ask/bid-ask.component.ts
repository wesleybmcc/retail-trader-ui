import { Component, OnInit, Input } from '@angular/core';
import { BidAskMessage } from 'src/app/model/bidAskMessage';
import { LivePriceService } from 'src/app/service/live-price.service';

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
  
  constructor(private livePriceService: LivePriceService) { }

  ngOnInit(): void {
    this.livePriceService.messageQueueEventEmitter.subscribe((bidAskMessage: BidAskMessage) => {
      if(bidAskMessage.symbol === this.symbol) {
        if(bidAskMessage.isBid) {
          this.bid = bidAskMessage.value;
        }
        else {
          this.ask = bidAskMessage.value;
        }
      }
    });
  }

}
