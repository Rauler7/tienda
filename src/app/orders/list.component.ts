import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { OrderService, ProductService, UserService } from '@app/_services';
import { Order, Product, User } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {

    orders!: Order[];
    products!: Product[];
    clients!: User[];

    startDate = new Date(2021, 0, 1);

    constructor(
      private orderService: OrderService,
      private productService: ProductService,
      private clientService: UserService) {}

    ngOnInit() {
      this.productService.getAll()
            .pipe(first())
            .subscribe(products => this.products = products);

      this.clientService.getAll()
          .pipe(first())
          .subscribe(clients => this.clients = clients);

      this.orderService.getAll()
          .pipe(first())
          .subscribe(orders => {
            this.orders = orders;
            /* this.orders.forEach(function (arrayItem) {
              var x = arrayItem.productId;
              console.log(x);
            }); */
        });
    }

    deleteOrder(id: string) {
        const order = this.orders.find(x => x.id === id);
        if (!order) return;
        order.isDeleting = true;
        this.orderService.delete(id)
            .pipe(first())
            .subscribe(() => this.orders = this.orders.filter(x => x.id !== id));
    }
}
