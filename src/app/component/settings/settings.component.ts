import { Component, OnInit } from '@angular/core';
import { BidAskMessage } from 'src/app/model/bidAskMessage';
import { LivePriceService } from 'src/app/service/live-price.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  messages: string[] = new Array<string>();

  constructor(private livePriceService: LivePriceService) { }

  ngOnInit(): void {
    this.livePriceService.messageQueueEventEmitter.subscribe((bidAskMessage: BidAskMessage) => {
      if(this.messages.length === 50) {
        this.messages.pop();
      }

      this.messages.push(`${new Date()} ${bidAskMessage.symbol} ${bidAskMessage.isBid} ${bidAskMessage.value}`);
    });
  }
}
