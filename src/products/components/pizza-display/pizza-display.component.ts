import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';

import { Pizza } from '../../models/pizza.model';

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opacity: 0 }),
    animate(
      '300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate(
      '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(-200px)', opacity: 0 })
    ),
  ]),
]);

@Component({
  selector: 'pizza-display',
  animations: [DROP_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['pizza-display.component.scss'],
  template: `

  

    <div class="pizza-display">
    
      <div class="pizza-display__base">
        <img src="/assets/img/pizza.svg">
        <ng-container *ngIf="pizza?.toppings && pizza?.toppings?.length">
          <img 
            *ngFor="let topping of pizza?.toppings; index as i;"
            src="/assets/img/toppings/{{ topping.name }}.svg" 
            [style.zIndex]="i"
            class="pizza-display__topping"
            @drop>
        </ng-container>
      </div>

    </div>
  `,
})
export class PizzaDisplayComponent {
  @Input() pizza: Pizza;
  constructor() {
    console.log(this.pizza);
  }
}

/*
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';

import { Pizza } from '../../models/pizza.model';

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opacity: 0 }),
    animate(
      '300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate(
      '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(-200px)', opacity: 0 })
    ),
  ]),
]);

@Component({
  selector: 'pizza-display',
  animations: [DROP_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['pizza-display.component.scss'],
  template: `
    <div class="pizza-display">
      <div class="pizza-display__base">
        <img src="/assets/img/pizza.svg">
        
        <ng-container *ngFor="let topping of pizza?.toppings; index as i;">
          <img 
            
            src="/assets/img/toppings/{{ topping.name }}.svg" 
            [style.zIndex]="i"
            class="pizza-display__topping"
            @drop
            *ngIf="topping && topping.name"
            >
        </ng-container>

      </div>
    </div>
  `,
})
export class PizzaDisplayComponent {
  @Input() pizza: Pizza = {};
}*/
