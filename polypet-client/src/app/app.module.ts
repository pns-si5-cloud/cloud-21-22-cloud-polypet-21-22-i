import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductListComponent } from './components/catalog/product-list/product-list.component';
import { ProductListItemComponent } from './components/catalog/product-list-item/product-list-item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductViewComponent } from './components/catalog/product-view/product-view.component';
import { FormsModule } from '@angular/forms';
import { CommandListComponent } from './components/command/command-list/command-list.component';
import { CommandComponent } from './components/command/command.component';
import { CommandListItemComponent } from './components/command/command-list-item/command-list-item.component';
import { CommandViewComponent } from './components/command/command-view/command-view.component';
import { PanelPartnerComponent } from './polypet-partner/panel-partner/panel-partner.component';
import { DeliveryListComponent } from './polypet-partner/delivery-list/delivery-list.component';
import { DeliveryListItemComponent } from './polypet-partner/delivery-list-item/delivery-list-item.component';
import { DeliveryViewComponent } from './polypet-partner/delivery-view/delivery-view.component';
import { DeliveryDateFormComponent } from './polypet-partner/delivery-date-form/delivery-date-form.component';
import { environment } from 'src/environments/environment';
import { AddProductFormComponent } from './components/product-creator/add-product-form/add-product-form.component';
import { PanelEmployeeComponent } from './polypet-employee/panel-employee/panel-employee.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AuthInterceptor } from './auth/auth.interceptor';
import { AddProductRequestFormComponent } from './components/product-creator/add-product-request-form/add-product-request-form.component';
import { ProductRequestListComponent } from './components/product-creator/product-request-list/product-request-list.component';
import { ProductRequestListItemComponent } from './components/product-creator/product-request-list-item/product-request-list-item.component';
import { ProductRequestViewComponent } from './components/product-creator/product-request-view/product-request-view.component';
import { BankPanelComponent } from './mock/bank/bank-panel/bank-panel.component';
import { BankAddCartComponent } from './mock/bank/bank-add-cart/bank-add-cart.component';
import { BankBalanceComponent } from './mock/bank/bank-balance/bank-balance.component';
import { BankAddAmountComponent } from './mock/bank/bank-add-amount/bank-add-amount.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartItemListComponent } from './components/shopping-cart/shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartItemListItemComponent } from './components/shopping-cart/shopping-cart-item-list-item/shopping-cart-item-list-item.component';
import { PaymentPanelComponent } from './order/payment/payment-panel/payment-panel.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CatalogComponent,
    HomeComponent,
    ProductListItemComponent,
    ProductViewComponent,
    AddProductFormComponent,
    PanelEmployeeComponent,
    CommandListComponent,
    CommandComponent,
    CommandListItemComponent,
    CommandViewComponent,
    PanelPartnerComponent,
    DeliveryListComponent,
    DeliveryListItemComponent,
    DeliveryViewComponent,
    DeliveryDateFormComponent,
    BankPanelComponent,
    BankAddCartComponent,
    BankBalanceComponent,
    BankAddAmountComponent,
    AddProductRequestFormComponent,
    ProductRequestListComponent,
    ProductRequestListItemComponent,
    ProductRequestViewComponent,
    ShoppingCartComponent,
    ShoppingCartItemListComponent,
    ShoppingCartItemListItemComponent,
    PaymentPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports:[AddProductFormComponent],
})
export class AppModule { }
