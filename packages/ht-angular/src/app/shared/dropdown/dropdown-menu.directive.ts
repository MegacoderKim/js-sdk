import {Directive, ElementRef, Host, OnInit} from '@angular/core';
import {DropdownDirective} from "./dropdown.directive";

@Directive({
  selector: '[htDropdownMenu]'
})
export class DropdownMenuDirective implements OnInit {

  constructor( @Host() public dropdown: DropdownDirective, public el: ElementRef) {
  }

  ngOnInit() {
    this.dropdown.dropDownMenu = this;
  }

}
