import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/auth/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductViewComponent } from './components/catalog/product-view/product-view.component';
import { CommandViewComponent } from './components/command/command-view/command-view.component';
import { CommandComponent } from './components/command/command.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductFormComponent } from './components/product-creator/add-product-form/add-product-form.component';
import { PanelEmployeeComponent } from './polypet-employee/panel-employee/panel-employee.component';
import { DeliveryViewComponent } from './polypet-partner/delivery-view/delivery-view.component';
import { PanelPartnerComponent } from './polypet-partner/panel-partner/panel-partner.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: 'catalog/product-details/:id', component: ProductViewComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'command', component: CommandComponent },
  { path: 'command/command-details/:id', component: CommandViewComponent },
  { path: 'product-creator/add-product', component: AddProductFormComponent },
  { path: 'employee/product-creator', component: PanelEmployeeComponent },
  { path: 'partner/delivery', component: PanelPartnerComponent },
  { path: 'partner/delivery-info/:id', component: DeliveryViewComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
