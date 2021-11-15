import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductViewComponent } from './components/catalog/product-view/product-view.component';
import { CommandViewComponent } from './components/command/command-view/command-view.component';
import { CommandComponent } from './components/command/command.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductFormComponent } from './components/product-creator/add-product-form/add-product-form.component';
import { PanelEmployeeComponent } from './polypet-employee/panel-employee/panel-employee.component';
import { DeliveryViewComponent } from './polypet-partner/delivery-view/delivery-view.component';
import { PanelPartnerComponent } from './polypet-partner/panel-partner/panel-partner.component';

const routes: Routes = [
  { path: 'catalog/product-details/:id', component: ProductViewComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'command', component: CommandComponent },
  { path: 'command/command-details/:id', component: CommandViewComponent },
  { path: 'product-creator/add-product', component: AddProductFormComponent },
  { path: 'employee/product-creator', component: PanelEmployeeComponent },
  { path: 'partner/delivery', component: PanelPartnerComponent },
  { path: 'partner/delivery-info/:id', component: DeliveryViewComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
