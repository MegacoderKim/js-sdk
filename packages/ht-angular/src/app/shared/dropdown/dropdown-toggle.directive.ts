import {Directive, ElementRef, Host, HostBinding, HostListener, Input} from '@angular/core';
import {DropdownDirective} from "./dropdown.directive";

@Directive({
  selector: '[htDropdownToggle]'
})
export class DropdownToggleDirective {

  @HostBinding('class.disabled')
  @Input() private disabled: boolean = false;

  @HostBinding('class.dropdown-toggle')
  @HostBinding('attr.aria-haspopup')
  private addClass = true;

  constructor(@Host() public dropdown: DropdownDirective, public el: ElementRef) {
  }

  ngOnInit() {
    this.dropdown.dropDownToggle = this;
  }

  @HostBinding('attr.aria-expanded')
  public get isOpen() {
    return this.dropdown.isOpen;
  }

  @HostListener('click', ['$event'])
  public toggleDropdown(event: MouseEvent) {
    event.stopPropagation();

    if (!this.disabled) {
      this.dropdown.toggle();
    }
    return false;
  }

}
