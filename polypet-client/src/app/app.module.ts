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
import { FormsModule } from '@angular/forms';
import { CommandListComponent } from './components/command/command-list/command-list.component';
import { CommandComponent } from './components/command/command.component';
import { CommandListItemComponent } from './components/command/command-list-item/command-list-item.component';
import { CommandViewComponent } from './components/command/command-view/command-view.component';
import { environment } from 'src/environments/environment';
import { AddProductFormComponent } from './components/product-creator/add-product-form/add-product-form.component';
import { PanelEmployeeComponent } from './polypet-employee/panel-employee/panel-employee.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { DashboardComponent } from './components/auth/dashboard/dashboard.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { AuthServiceComponent } from './auth/auth-service/auth-service.component';







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
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AuthServiceComponent
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
  providers: [],
  bootstrap: [AppComponent],
  exports:[AddProductFormComponent],
})
export class AppModule { }
