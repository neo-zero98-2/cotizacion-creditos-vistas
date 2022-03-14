import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditosComponent } from './pages/creditos/creditos.component';
import { PlazosComponent } from './pages/plazos/plazos.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  {path: 'productos', component: ProductosComponent},
  {path: 'plazos', component: PlazosComponent},
  {path: 'creditos', component: CreditosComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'productos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
