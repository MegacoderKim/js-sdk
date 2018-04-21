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


export const cardStackFn = function (className) {
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
}
