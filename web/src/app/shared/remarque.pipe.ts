import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remarque'
})
export class RemarquePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value == ""){
      return "Aucune remarque";
    }
    else{
      return value;
    }
  }

}
