import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  EventEmitter,
  HostListener, Renderer2, Input,
} from "@angular/core";
import Popper from 'popper.js';
import {Placements, Triggers, PopperContentOptions} from './popper.model';

@Component({
  selector: "popper-content",
  template: `
<div #popperViewRef 
     [class.ngxp__container]="!popperOptions.disableDefaultStyling"  
     [class.ngxp__animation]="!popperOptions.disableAnimation"
     [style.display]="displayType"
     [style.opacity]="opacity"
     role="popper">
    <ng-content ></ng-content>  
    
</div>
`,
  styles: [`
.ngxp__container {
  display:none;
    z-index: 1000;
}
.ngxp__container.ngxp__animation {
   -webkit-animation: ngxp-fadeIn  150ms ease-out;
    -moz-animation: ngxp-fadeIn  150ms ease-out;
    -o-animation: ngxp-fadeIn  150ms ease-out;
    animation: ngxp-fadeIn  150ms ease-out;
  
}

.ngxp__container[x-placement^="top"],
.ngxp__container[x-placement^="bottom"],
.ngxp__container[x-placement^="right"],
.ngxp__container[x-placement^="left"]
{
  display:block;
}

@-webkit-keyframes ngxp-fadeIn { 
 0% {
        display: none;
        opacity: 0;
    }
    1% {
        display: block;
        opacity: 0;
    }
    100% {
        display: block;
        opacity: 1;
    }
}
@keyframes ngxp-fadeIn {
  0% {
        display: none;
        opacity: 0;
    }
    1% {
        display: block;
        opacity: 0;
    }
    100% {
        display: block;
        opacity: 1;
    }
}
`]
})
export class PopperContent implements OnDestroy {

  popperOptions: PopperContentOptions = <PopperContentOptions>{
    disableAnimation: false,
    disableDefaultStyling: false,
    placement: Placements.AutoTop,
    boundariesElement: '',
    trigger: Triggers.HOVER,
    positionFixed: false,
    popperModifiers: {}
  };

  @Input() referenceObject: HTMLElement;

  isMouseOver: boolean = false;

  onHidden = new EventEmitter();

  text: string;

  popperInstance: Popper;

  displayType: string = "none";

  opacity: number = 0;

  private globalResize: any;

  @ViewChild("popperViewRef")
  popperViewRef: ElementRef;

  @HostListener('mouseover')
  onMouseOver() {
    this.isMouseOver = true;
  }

  @HostListener('mouseleave')
  showOnLeave() {
    this.isMouseOver = false;
    if (this.popperOptions.trigger !== Triggers.HOVER) {
      return;
    }
    this.hide();
  }

  onDocumentResize() {
    this.update();
  }

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.show()
  }

  ngOnDestroy() {
    if (!this.popperInstance) {
      return;
    }
    (this.popperInstance as any).disableEventListeners();
    this.popperInstance.destroy();

  }

  show(): void {
    if (!this.referenceObject) {
      return;
    }

    let popperOptions: Popper.PopperOptions = <Popper.PopperOptions>{
      placement: this.popperOptions.placement,
      positionFixed: this.popperOptions.positionFixed,
      modifiers: {
        preventOverflow: {
          escapeWithReference: true,
          // boundariesElement: 'viewport'
        },
        offset: {
          offset: '0px, 8px'
        }
      }
    };

    let boundariesElement = this.popperOptions.boundariesElement && document.querySelector(this.popperOptions.boundariesElement);

    if (popperOptions.modifiers && boundariesElement) {
      popperOptions.modifiers.preventOverflow = { boundariesElement };
    }

    popperOptions.modifiers = Object.assign(popperOptions.modifiers, this.popperOptions.popperModifiers);

    this.popperInstance = new Popper(
      this.referenceObject,
      this.popperViewRef.nativeElement,
      popperOptions,
    );
    (this.popperInstance as any).enableEventListeners();
    this.scheduleUpdate();
    this.toggleVisibility(true);
    this.globalResize = this.renderer.listen('document', 'resize', this.onDocumentResize.bind(this))
  }

  update(): void {
    this.popperInstance && (this.popperInstance as any).update();
  }

  scheduleUpdate(): void {
    this.popperInstance && (this.popperInstance as any).scheduleUpdate();
  }

  hide(): void {
    // if (this.popperInstance) {
    //   this.popperInstance.destroy();
    // }
    // this.toggleVisibility(false);
    // this.onHidden.emit();
  }

  toggleVisibility(state: boolean) {
    if (!state) {
      this.opacity = 0;
      // this.displayType = "none";
    }
    else {
      this.opacity = 1;
      this.displayType = "block";
    }
  }

  private clearGlobalResize(){
    this.globalResize && typeof this.globalResize === 'function' && this.globalResize();
  }

}
