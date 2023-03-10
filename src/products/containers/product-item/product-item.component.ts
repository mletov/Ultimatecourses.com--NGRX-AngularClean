import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';

import { Topping } from '../../models/topping.model';
import { ToppingsService } from '../../services/toppings.service';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza"
        [toppings]="toppings"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  public pizza: Pizza = {};
  public visualise: Pizza = {};
  public toppings: Topping[] = [];

  constructor(
    private pizzaService: PizzasService,
    private toppingsService: ToppingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      const param = this.route.snapshot.params['id'];
      let pizza: Pizza;
      if (param === 'new') {
        pizza = {};
      } else {
        pizza = pizzas.find(pizza => pizza.id == parseInt(param, 10)) as Pizza;
      }
      this.pizza = pizza;

    //  if (param !== 'new') {
        
        this.toppingsService.getToppings().subscribe(toppings => {
          this.toppings = toppings;
          const ids = toppings.map(topping => topping.id) as number[];
          if (param !== 'new')
            this.onSelect(ids);
          else 
            this.onSelect([]);
        });
      //}
      //else 
      // this.onSelect([]);
    });
  }

  onSelect(event: number[]) {
    
    let toppings: Topping[];

    if (this.toppings && this.toppings.length) {
      /*
      toppings = [event.map(id =>
        this.toppings.find(topping => topping.id === id)
      )];*/
      toppings = this.toppings.filter(t => event.includes(t.id ?? 0));
      //console.log(event);
    } else {
      toppings = this.pizza.toppings ?? [];
    }
    
    this.visualise = { ...this.pizza, toppings};
  }

  onCreate(event: Pizza) {
    console.log("onCreate");
    this.pizzaService.createPizza(event).subscribe(pizza => {
      this.router.navigate([`/products/${pizza.id}`]);

      this.ngOnInit();
    });
  }

  onUpdate(event: Pizza) {
//    console.log("onUpdate");
    this.pizzaService.updatePizza(event).subscribe(() => {
      this.router.navigate([`/products`]);
    });
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.pizzaService.removePizza(event).subscribe(() => {
        this.router.navigate([`/products`]);
      });
    }
  }
}
