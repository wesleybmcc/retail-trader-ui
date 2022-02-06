import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  selectedInstruments: string[] = [];

  constructor() {     
    this.selectedInstruments = ['NQ', 'ES', 'CL'];
  }

  public getSelectedInstruments(): string[] {
    return this.selectedInstruments;
  }
}
