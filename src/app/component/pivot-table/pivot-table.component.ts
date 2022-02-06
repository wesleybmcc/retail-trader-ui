import { Component, Input, OnInit } from '@angular/core';
import { Instrument } from 'src/app/model/instrument';
import { PivotSetting, PIVOT_NAME } from '../../model/pivotLevel';

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.css']
})
export class PivotTableComponent {
  private _instrument: Instrument;
  private _pivotName: string = '';
  private _pivotSetting: PivotSetting;
  
  @Input() 
  public set instrument(value: Instrument) {
    this._instrument = value; 
  }
  
  @Input() 
  public set pivotName(value: string) {
    this._pivotName = value;
    this.setPivotFields();
  }
  
  @Input() set pivotSettings(value: PivotSetting) {
    this._pivotSetting = value;
  }

  public get pivotName(): string { return this._pivotName; }
  public get instrument(): Instrument { return this._instrument; }
  pivotFields: string[] = [];

  constructor() { }

  // TO-DO: Remove hardcoded values
  private setPivotFields() {
    this.pivotFields = this.pivotName === PIVOT_NAME.CAMARILLA ? 
      ['r4', 'r3', 'r2', 'r1', 'pp', 's1', 's2', 's3', 's4'] : this.pivotName === PIVOT_NAME.WOODIE ? 
      ['r3', 'r2', 'r1', 'pp', 's1', 's2', 's3'] : [];
  }

  getPivotLevel(field: string): number {  
    let pivotLevel: number = 0;
    if(this._pivotSetting) {
      for(const [key,value] of Object.entries(this._pivotSetting?.pivotLevel!)) {
        if(field === key) {
          pivotLevel = value;
        }
      }
    }

    return pivotLevel;
  }
}
