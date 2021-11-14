import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductViewComponent } from './components/catalog/product-view/product-view.component';
import { CommandViewComponent } from './components/command/command-view/command-view.component';
import { CommandComponent } from './components/command/command.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductFormComponent } from './components/product-creator/add-product-form/add-product-form.component';
import { PanelEmployeeComponent } from './polypet-employee/panel-employee/panel-employee.component';

const routes: Routes = [
  { path: 'catalog/product-details/:id', component: ProductViewComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'command', component: CommandComponent },
  { path: 'command/command-details/:id', component: CommandViewComponent },
  { path: 'product-creator/add-product', component: AddProductFormComponent },
  { path: 'employee/product-creator', component: PanelEmployeeComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
