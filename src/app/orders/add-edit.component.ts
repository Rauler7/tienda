import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ProductService, UserService, OrderService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { Order, Product, User } from '@app/_models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;

    orders!: Order[];
    products!: Product[];
    clients!: User[];

    editingProduct: any;

    startDate = new Date(2021, 0, 1);


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private clientService: UserService,
        private orderService: OrderService,
        private alertService: AlertService,
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.orderService.getAll()
          .pipe(first())
          .subscribe(orders => {
            this.orders = orders;
            let editingOrder = this.orders.find(x => x.id === this.id);
            this.f['productId'].setValue(editingOrder?.productId), {onlySelf: true};
            this.f['clientId'].setValue(editingOrder?.clientId), {onlySelf: true};
            this.f['date'].setValue(editingOrder?.date), {onlySelf: true};
            this.f['quantity'].setValue(editingOrder?.quantity), {onlySelf: true};
          });

        this.productService.getAll()
          .pipe(first())
          .subscribe(products => this.products = products);

        this.clientService.getAll()
          .pipe(first())
          .subscribe(clients => this.clients = clients);
        //this.setProductName(this.id);

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
        this.form = this.formBuilder.group({
            id: ['', Validators.required],
            productId: ['', Validators.required],
            clientId: ['', Validators.required],
            quantity: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
            date: ['', Validators.required]
        }/* , formOptions */);

        /* this.onChangeClientName(this.id);
        this.onChangeProductName(this.id); */

        if (!this.isAddMode) {
            this.orderService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createProduct();
        } else {
            this.updateProduct();
        }
    }

    private createProduct() {
        this.orderService.create(this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Order added', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

    private updateProduct() {
        this.orderService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Order updated', { keepAfterRouteChange: true });
                this.router.navigate(['../../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

    /* private setProductName(id: string) {
      let product = this.products.find(x => x.id === id);
      this.form.patchValue({
        productId: product
      })
    } */

    public onChangeProductName(event: any) {
      let order = this.orders.find(x => x.id === event);

      this.f['productId'].setValue(event, {onlySelf: true});
    }

    public onChangeClientName(event: any) {
      this.f['clientId'].setValue(event, {onlySelf: true});
    }
}
