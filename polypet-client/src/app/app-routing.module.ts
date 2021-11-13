import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Product } from './classes/product';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductViewComponent } from './components/catalog/product-view/product-view.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'catalog/product-details/:id', component: ProductViewComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
