import { Component, OnInit, Input } from '@angular/core';
import { BidAskMessage } from 'src/app/model/bidAskMessage';
import { LivePriceService } from 'src/app/service/live-price.service';

@Component({
  selector: 'app-price-difference',
  templateUrl: './price-difference.component.html',
  styleUrls: ['./price-difference.component.css']
})
export class PriceDifferenceComponent implements OnInit {
  @Input() symbol: string = '';
  @Input() pivotField: string = '';
  @Input() pivotName: string = '';
  @Input() priceLevel: number = 0;
  
  difference: number = 0;
  actualPrice: number = 0;
  alertThreshold: number = 45;

  showHover: boolean = false;
  hoverMessage: string = '';
  
  constructor(private livePriceService: LivePriceService) { }

  ngOnInit(): void {
    this.livePriceService.messageQueueEventEmitter.subscribe((bidAskMessage: BidAskMessage) => {
      const pipFactor: number = this.symbol.indexOf('JPY') >= 0 ? 1000 : 100000;
      if(bidAskMessage.symbol === this.symbol) {      
        if(!bidAskMessage.isBid) {
          this.actualPrice = bidAskMessage.value;
          this.difference = Math.round((this.actualPrice  - this.priceLevel) * pipFactor);
        }  
      }
    });
  }
}
