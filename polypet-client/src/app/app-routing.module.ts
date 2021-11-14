import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductViewComponent } from './components/catalog/product-view/product-view.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductFormComponent } from './components/product-creator/add-product-form/add-product-form.component';
import { PanelEmployeeComponent } from './polypet-employee/panel-employee/panel-employee.component';

const routes: Routes = [
  { path: 'catalog/product-details/:id', component: ProductViewComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'product-creator/add-product', component: AddProductFormComponent },
  { path: 'employee/product-creator', component: PanelEmployeeComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
