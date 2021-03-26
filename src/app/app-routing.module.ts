import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const productsModule = () => import('./products/products.module').then(x => x.ProductsModule);
const ordersModule = () => import('./orders/orders.module').then(x => x.OrdersModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', loadChildren: usersModule },
    { path: 'products', loadChildren: productsModule },
    { path: 'orders', loadChildren: ordersModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
