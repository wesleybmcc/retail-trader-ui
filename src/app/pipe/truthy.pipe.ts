import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truthy'
})
export class TruthyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
