import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserProductComponent } from './user-product/user-product.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminProductAddComponent } from './admin-product-add/admin-product-add.component';
import { AdminProductEditComponent } from './admin-product-edit/admin-product-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user-home', component: UserProductComponent, canActivate: [AuthGuard] },
  { path: 'admin-products', component: AdminProductComponent, canActivate: [AdminGuard] },
  { path: 'admin-product-add', component: AdminProductAddComponent, canActivate: [AdminGuard] },
  { path: 'admin-product-edit/:productId', component: AdminProductEditComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
