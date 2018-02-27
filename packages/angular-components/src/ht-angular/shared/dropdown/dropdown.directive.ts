import {Directive, Input, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[htDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.is-active') show: boolean = false;
  @Input() appDropdown: 'onHover' | 'onClick' = 'onHover';
  @Input() hover: boolean;

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
    if (!this.appDropdown || this.appDropdown === 'onHover') {
      this.show = true;
    }

  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event) {
    if (!this.appDropdown || this.appDropdown === 'onHover') {
      this.show = false;
    }
  }
  @HostListener('click', ['$event'])
  onClick(event) {
    if (this.appDropdown == 'onClick') {
      this.show = !this.show;
    }

  }

  // @HostListener('window:click', ['$event'])
  // onClick(event) {
  //   if(event.target.id != 'accounts') {
  //     this.showAccountDropDown = false;
  //   }
  // }
  //
  // @HostListener('window:click', ['$event'])
  // onClick(event) {
  //   if(event.target.id != 'accounts') {
  //     this.showAccountDropDown = false;
  //   }
  // }
  constructor() {

  }

  ngOnInit() {

  }

}
