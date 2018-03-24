
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]'
})
export class OnlyNumbersDirective implements OnInit {

  regexStr = "^[0-9]*$";

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.onkeydown = (evt) => {
      let e = <KeyboardEvent> event;
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
      }
      let ch = '';
        if(e.keyCode >= 96 && e.keyCode <=105) {
          ch = String.fromCharCode(e.keyCode-48);
        } else {
          ch = String.fromCharCode(e.keyCode);
        }
        let regEx =  new RegExp(this.regexStr);    
        if(regEx.test(ch))
          return;
        else
           e.preventDefault();
    };

    this.el.nativeElement.onkeyup = (evt) => {
      let e = <KeyboardEvent> event;
      let newValue = this.el.nativeElement.value.replace(/[^0-9]/g, '');
      this.el.nativeElement.value = newValue;
      return;
    };
  }

}