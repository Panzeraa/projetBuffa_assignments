import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class RenduDirective {

  constructor(el: ElementRef) {
    const htmlElement = el.nativeElement;

    htmlElement.style.color = 'green';
    htmlElement.style.border = '1px dashed green';
    htmlElement.style.padding = '5px';

    /*
    htmlElement.innerHTML += "<b>CHECK ICON</b>"
    htmlElement.onclick = () => { console.log("cliqué")}
    */
  }

}
