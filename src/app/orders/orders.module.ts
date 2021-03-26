import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';

import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LLLL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        OrdersRoutingModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
    ],
    providers: [
      MatDatepickerModule,
      MatNativeDateModule,
       { provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
       {  provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
       },
       {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class OrdersModule { }
