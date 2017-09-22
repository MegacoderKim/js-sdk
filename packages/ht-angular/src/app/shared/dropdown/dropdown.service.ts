import {Inject, Injectable} from '@angular/core';
import {DropdownDirective} from "./dropdown.directive";
import {DOCUMENT} from "@angular/common";

export const ALWAYS = 'always';
export const DISABLED = 'disabled';
export const OUTSIDECLICK = 'outsideClick';
export const NONINPUT = 'nonInput';

@Injectable()
export class DropdownService {

  constructor(@Inject(DOCUMENT) private document: any) {

  }
  private openScope: DropdownDirective;
  private dropdownScope: DropdownDirective;

  private closeDropdownBind: EventListener = this.closeDropdown.bind(this);
  private keybindFilterBind: EventListener = this.keybindFilter.bind(this);

  public open(dropdownScope: DropdownDirective) {
    if (!this.openScope) {
      this.document.addEventListener('click', this.closeDropdownBind);
      this.document.addEventListener('keydown', this.keybindFilterBind);
    }

    if (this.openScope && this.openScope !== this.dropdownScope) {
      this.openScope.isOpen = false;
    }

    this.openScope = dropdownScope;
  }

  public close(dropdownScope: DropdownDirective) {
    if (this.openScope !== dropdownScope) {
      return;
    }

    this.openScope = null;
    this.document.removeEventListener('click', this.closeDropdownBind);
    this.document.removeEventListener('keydown', this.keybindFilterBind);
  }

  private closeDropdown(event: MouseEvent) {
    if (!this.openScope) {
      return;
    }

    if (event && this.openScope.autoClose === DISABLED) {
      return;
    }

    if (event && this.openScope.toggleEl &&
      this.openScope.toggleEl.nativeElement === event.target) {
      return;
    }

    if (event && this.openScope.autoClose === NONINPUT &&
      this.openScope.menuEl &&
      /input|textarea/i.test((<any> event.target).tagName) &&
      this.openScope.menuEl.nativeElement.contains(event.target)) {
      return;
    }

    if (event && this.openScope.autoClose === OUTSIDECLICK &&
      this.openScope.menuEl &&
      this.openScope.menuEl.nativeElement.contains(event.target)) {
      return;
    }

    this.openScope.isOpen = false;
  }

  private keybindFilter(event: KeyboardEvent) {
    if (event.which === 27) {
      this.openScope.focusToggleElement();
      this.closeDropdown(null);
      return;
    }

    if (this.openScope.keyboardNav && this.openScope.isOpen &&
      (event.which === 38 || event.which === 40)) {
      event.preventDefault();
      event.stopPropagation();
      this.openScope.focusDropdownEntry(event.which);
    }
  }

}
