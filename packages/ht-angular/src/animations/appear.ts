// import {animate, style, transition, trigger} from "@angular/animations";
//
// export const anim = {
//   popup : entryLeaveTransition('popup', {transform: 'translate(0, 140px)'}, '0.2s'),
//
//   appear: entryLeaveTransition('appear', {opacity: 0}, '0.2s'),
//
//   sticky: entryLeaveTransition('sticky', {opacity: 0, height: 0}, '0.2s'),
//
//   card: entryLeaveTransition('card', {transform: 'translateX(-100px)', height: 0, opacity: 0}, '0.3s'),
//
//   overlay: entryLeaveTransition('overlay', {top: '100%'}, '0.2s'),
//
//   slide: entryLeaveTransition('slide', {width: '0', opacity: 0}, '0.2s'),
//
//   slideDown: entryLeaveTransition('slide', {height: '0', opacity: 0}, '0.2s'),
//
//   appearIn: entryLeaveTransition('appearIn', {transform: 'scale(0.5)', opacity: 0}, '0.3s'),
//
//   flip: entryLeaveTransition('flip', {transform: 'rotateX(90deg)'}, '0.5s')
//
// }
//
// export function entryLeaveTransition(name: string, entryStyle: {[key: string]: string | number}, duration: string = '0.4s') {
//   return trigger(name, [
//     transition(':enter', [
//       style(entryStyle),
//       animate(duration + ' ease-out')
//     ]),
//     transition(':leave', [
//       animate(duration + ' ease-in', style(entryStyle))
//     ])
//   ]);
// }
