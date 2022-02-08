import { Component, OnInit, Input } from '@angular/core';
import { BidAskMessage } from 'src/app/model/bidAskMessage';
import { Instrument } from 'src/app/model/instrument';
import { Pivot } from 'src/app/model/pivot';
import { PIVOT_NAME } from 'src/app/model/pivotLevel';
import { LivePriceService } from 'src/app/service/live-price.service';
import { PivotService } from 'src/app/service/pivot.service';

interface PivotDifference {
  symbol: string;
  pivotName: string;
  pivotLevelName: string;
  priceLevel: number;
  difference: number;
  absDifference: number;
  show: boolean;
}

interface PivotDefinition {
  name: string;
  levels: string[];
}

@Component({
  selector: 'app-pivot-difference-list',
  templateUrl: './pivot-difference-list.component.html',
  styleUrls: ['./pivot-difference-list.component.css']
})
export class PivotDifferenceListComponent implements OnInit {
  @Input() pivotNames: string[] = [];
  @Input() instruments: Instrument[] = [];

  pivotDifferences: PivotDifference[] = new Array<PivotDifference>();
  pivots: Pivot[] = new Array<Pivot>();

  constructor(private livePriceService: LivePriceService, private pivotService: PivotService) { }

  ngOnInit(): void {

    this.pivotService.getPivots().subscribe((pivots: Pivot[]) => {
        this.pivots = pivots;
        this.createPivotDifferences();
      });

    this.livePriceService.messageQueueEventEmitter.subscribe((bidAskMessage: BidAskMessage) => {
      const pipFactor: number = bidAskMessage.symbol.indexOf('JPY') >= 0 ? 1000 : 100000;
      const pivotDifferences: PivotDifference[] = this.pivotDifferences.filter(pd => pd.symbol === bidAskMessage.symbol);
      pivotDifferences.forEach((pivotDifferences: PivotDifference) => {
        if(!bidAskMessage.isBid) {
          pivotDifferences.difference = Math.round((bidAskMessage.value  - pivotDifferences.priceLevel) * pipFactor);
          pivotDifferences.absDifference = Math.abs(pivotDifferences.difference);
          pivotDifferences.show = pivotDifferences.absDifference < 75;
        }
      });
    });
  }

  private createPivotDifferences() {
    const pivotDefinitions: PivotDefinition[] = [
      { name: PIVOT_NAME.CAMARILLA, levels: ['r4', 'r3', 'r2', 'r1', 'pp', 's1', 's2', 's3', 's4']},
      { name: PIVOT_NAME.WOODIE, levels: ['r3', 'r2', 'r1', 'pp', 's1', 's2', 's3']}
    ];

    this.pivotNames.forEach((pivotName: string) => { 
      const pivotDefinition: PivotDefinition = pivotDefinitions.find(pl => pl.name.toLowerCase() === pivotName.toLowerCase())!;
      
      this.instruments.forEach((instrument: Instrument) => {
        pivotDefinition.levels.forEach((level: string) => {
          const pivot: Pivot = this.pivots.filter(p => p.instrument == instrument.symbol && p.name.toLowerCase().indexOf(pivotName.toLowerCase()) >= 0)![0];
          
          const pivotDifference: PivotDifference = {
            symbol: instrument.symbol,
            pivotName: pivotName,
            pivotLevelName: level,
            priceLevel: 0,
            difference: 0,
            absDifference: 0,
            show: false
          };

          for(const [pivotKey,pivotValue] of Object.entries(pivot)) {
              for(const [pdKey,pdValue] of Object.entries(pivotDifference)) {
                if(pdKey === 'pivotLevelName' && pivotKey === pdValue) {
                  pivotDifference.priceLevel = pivotValue;
                }
            }
          }
          
          this.pivotDifferences.push(pivotDifference);

        });
      });
    });
  }
}