import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'components', loadChildren: './systems/systems.module#SystemsModule' },
  { path: 'patterns', loadChildren: './patterns/patterns.module#PatternsModule' },
  { path: 'products', loadChildren: './products/products.module#ProductsModule' },
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule' },
  { path: 'capabilities', loadChildren: './capabilities/capabilities.module#CapabilitiesModule' },
  { path: 'configuration', loadChildren: './pages/configuration/configuration.module#ConfigurationModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutModule' },
  { path: '', redirectTo: '/about', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
