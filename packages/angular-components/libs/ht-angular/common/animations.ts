import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

export const shuffle = trigger('shuffle', [
  transition('* => *',
    animate(500, keyframes([
      style('*'),
      style({ opacity: 0.1}),
      style('*'),
    ]))
  ),
]);


export function cardStackFn (className) {
  return trigger('cardStack', [
    transition('* => *', [
      query(`.${className}:enter`, [
        style({transform: 'translateX(-100px)', height: 0, opacity: 0}),
        animate('0.3s' + ' ease-out')
      ], {optional: true}),
      query(`.${className}:leave`, [
        style({transform: 'translateX(0px)', height: '*', opacity: 1}),
        animate('0.3s' + ' ease-in', style({transform: 'translateX(-100px)', height: 0, opacity: 0}))
      ], {optional: true})
    ])
  ])
};

export const overlay = entryLeaveTransition('overlay', {top: '100%'}, '0.2s');

export const bottomAppear = entryLeaveTransition('bottomAppear', {transform: "translateY(120%)"}, '0.3s');

export const fadeAppear = entryLeaveTransition('fadeAppear', {opacity: 0}, '0.3s');

export const expandAppear = entryLeaveTransition('expandAppear', {width: 0, opacity: 0, transform: "scaleX(0)"});

export const summaryAnim = trigger('summaryAnim', [
  transition(':enter', [
    style({transform: 'translateX(-100px) scaleY(0)', height: 0, opacity: 0}),
    animate('0.3s' + ' ease-out')
  ]),
  transition(':leave', [
    animate('0.3s' + ' ease-in-out', style({transform: 'translateX(-100px) scaleY(0)', height: 0, opacity: 0}))
  ])]);


export function entryLeaveTransition(name: string, entryStyle: {[key: string]: string | number}, duration: string = '0.4s') {
  return trigger(name, [
    transition(':enter', [
      style(entryStyle),
      animate(duration + ' ease-out')
    ]),
    transition(':leave', [
      animate(duration + ' ease-in', style(entryStyle))
    ])
  ]);
}