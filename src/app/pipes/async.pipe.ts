import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'async'
})
export class AsyncPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
