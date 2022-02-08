import { Component, Input } from '@angular/core';
import { Instrument } from 'src/app/model/instrument';
import { Pivot } from 'src/app/model/pivot';
import { PivotService } from 'src/app/service/pivot.service';
import { PivotSetting } from '../../model/pivotLevel';

interface PivotListItem {
  symbol: string;
  pivotName: string;
  pivotField: string;
  value: number;
  difference: number;
}

@Component({
  selector: 'app-pivot-list',
  templateUrl: './pivot-list.component.html',
  styleUrls: ['./pivot-list.component.css']
})
export class PivotListComponent {
  private _instrument: Instrument;
  private _pivotName: string = '';

  @Input() 
  public set instrument(value: Instrument) {
    this._instrument = value; 
  }

  
  @Input() 
  public set pivotName(value: string) {
    this._pivotName = value;
  }
  
  public get pivotName(): string { return this._pivotName; }
  public get instrument(): Instrument { return this._instrument; }
  pivotListItem: PivotListItem;

  constructor(private pivotService: PivotService) { }
}
