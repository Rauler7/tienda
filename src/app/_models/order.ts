export class Order {
    id!: string;
    clientId!: string;
    productId!: string;
    quantity!: string;
    date!: Date;
    isDeleting: boolean = false;
}
