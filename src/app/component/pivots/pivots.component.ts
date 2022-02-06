import { Component, OnInit } from '@angular/core';
import { Instrument } from 'src/app/model/instrument';
import { Pivot } from 'src/app/model/pivot';
import { PivotSetting } from 'src/app/model/pivotLevel';
import { InstrumentService } from 'src/app/service/instrument.service';
import { PivotService } from 'src/app/service/pivot.service';

@Component({
  selector: 'app-pivots',
  templateUrl: './pivots.component.html',
  styleUrls: ['./pivots.component.css']
})
export class PivotsComponent implements OnInit {
  instruments: Instrument[] = new Array<Instrument>();
  pivotNames: string[] = new Array<string>();
  pivots: Pivot[] = new Array<Pivot>();

  viewType: string = ''
  pivotView: string = 'table';

  constructor(private instrumentService: InstrumentService, private pivotService: PivotService) { }

  ngOnInit(): void {
    this.instrumentService.getInstruments().subscribe((instruments: Instrument[]) => {
      this.instruments = instruments;  
    });

    this.pivotService.getPivotNames().subscribe((pivotNames: string[]) => {
      this.pivotNames = pivotNames;
    });

    this.pivotService.getPivots().subscribe((pivots: Pivot[]) => {
      this.pivots = pivots;
    });
  }

  getPivotSettings(symbol: string, pivotName: string): PivotSetting {
    const pivot: Pivot = this.pivots.find(p => p.instrument === symbol && 
      p.name.toLowerCase().indexOf(pivotName.toLowerCase()) != -1)!;
    
    // TO-DO: Refactor
    const pivotSetting: PivotSetting = {symbol: symbol, name: pivotName, pivotLevel: {
      r4: 0, r3: 0, r2: 0, r1: 0, pp: 0, s1: 0, s2: 0, s3: 0, s4: 0
    }};

    if(pivot) {
      pivotSetting.pivotLevel = { r4: pivot.r4, r3: pivot.r3, r2: pivot.r2, r1: pivot.r1, pp: pivot.pp,
        s1: pivot.s1, s2: pivot.s2, s3: pivot.s3, s4: pivot.s4};
    }

    return pivotSetting;
  }
}
