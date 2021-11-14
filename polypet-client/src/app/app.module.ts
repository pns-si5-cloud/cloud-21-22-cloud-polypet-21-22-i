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
import { HttpClientModule } from '@angular/common/http';
import { ProductViewComponent } from './components/catalog/product-view/product-view.component';
import { AddProductFormComponent } from './components/product-creator/add-product-form/add-product-form.component';
import { FormsModule } from '@angular/forms';
import { PanelEmployeeComponent } from './polypet-employee/panel-employee/panel-employee.component';





@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CatalogComponent,
    HomeComponent,
    ProductListItemComponent,
    ProductViewComponent,
    AddProductFormComponent,
    PanelEmployeeComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[AddProductFormComponent],
})
export class AppModule { }
