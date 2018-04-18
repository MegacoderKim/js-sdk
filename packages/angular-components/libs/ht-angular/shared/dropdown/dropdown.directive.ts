import {Directive, Input, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[htDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.is-active') show: boolean = false;
  @Input() htDropdown: 'onHover' | 'onClick' = 'onHover';
  @Input() hover: boolean;

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
    if (!this.htDropdown || this.htDropdown === 'onHover') {
      this.show = true;
    }

  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event) {
    if (!this.htDropdown || this.htDropdown === 'onHover') {
      this.show = false;
    }
  }
  @HostListener('click', ['$event'])
  onClick(event) {
    if (this.htDropdown == 'onClick') {
      this.show = !this.show;
    }
    event.stopPropagation();
    // event.preventDefault();
  }

  // @HostListener('window:click', ['$event'])
  // onClick(event) {
  //   if(event.target.id != 'accounts') {
  //     this.showAccountDropDown = false;
  //   }
  // }
  //
  @HostListener('window:click', ['$event'])
  onWidowClick(event) {
    if (this.htDropdown == 'onClick') {
      this.show = false;
    }
  }
  constructor() {

  }

  ngOnInit() {

  }

}
