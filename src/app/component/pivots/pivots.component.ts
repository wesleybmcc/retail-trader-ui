import { Component, OnInit } from '@angular/core';
import { Instrument } from 'src/app/model/instrument';
import { Pivot } from 'src/app/model/pivot';
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

  selectedPivotViewIndex: number = 0;
  pivotViews: string[] = new Array<string>();

  constructor(private instrumentService: InstrumentService, private pivotService: PivotService) { }

  ngOnInit(): void {
    this.pivotViews.push('table');
    this.pivotViews.push('summary');
    this.pivotViews.push('view1');
    this.pivotViews.push('view2');

    this.instrumentService.getInstruments().subscribe((instruments: Instrument[]) => {
      this.instruments = instruments;  
    });

    this.pivotService.getPivotNames().subscribe((pivotNames: string[]) => {
      this.pivotNames = pivotNames;
    });

  }

  toggleView(){
    this.selectedPivotViewIndex++;
    if(this.selectedPivotViewIndex === this.pivotViews.length) {
      this.selectedPivotViewIndex = 0;
    }
  }
}
