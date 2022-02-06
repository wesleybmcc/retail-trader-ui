import { Component, OnInit } from '@angular/core';
import { PriceWatchService } from './service/price-watch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-app-template';

  constructor(private priceWatchService: PriceWatchService) {}

  ngOnInit() {

  }
}
