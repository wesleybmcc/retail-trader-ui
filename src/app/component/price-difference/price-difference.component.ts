import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { PriceWatchService } from 'src/app/service/price-watch.service';
import { BidAskResponse } from '../../model/price';

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
  
  constructor(private priceWatchService: PriceWatchService) { }

  ngOnInit(): void {
    this.priceWatchService.priceWatchEventEmitter.subscribe((bidAskResponse: BidAskResponse) => {
      const pipFactor: number = this.symbol.indexOf('JPY') >= 0 ? 1000 : 100000;
      if(bidAskResponse.instrument === this.symbol) {        
        this.actualPrice = bidAskResponse.ask.close;
        this.difference = Math.round((this.actualPrice  - this.priceLevel) * pipFactor);
      }
    });
  }
}
