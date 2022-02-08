import { Component, OnInit, Input } from '@angular/core';
import { Instrument } from 'src/app/model/instrument';
import { Pivot } from 'src/app/model/pivot';
import { PivotSetting } from 'src/app/model/pivotLevel';
import { PivotService } from 'src/app/service/pivot.service';

@Component({
  selector: 'app-pivot-table-view',
  templateUrl: './pivot-table-view.component.html',
  styleUrls: ['./pivot-table-view.component.css']
})
export class PivotTableViewComponent implements OnInit {
  @Input() pivotNames: string[] = [];
  @Input() instruments: Instrument[] = [];
  @Input() pivotSettings: PivotSetting | undefined;
  pivots: Pivot[] = new Array<Pivot>();

  constructor(private pivotService: PivotService) { }

  ngOnInit(): void {
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
