import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'components', loadChildren: () => import('./systems/systems.module').then(m => m.SystemsModule) },
  { path: 'patterns', loadChildren: () => import('./patterns/patterns.module').then(m => m.PatternsModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'capabilities', loadChildren: () => import('./capabilities/capabilities.module').then(m => m.CapabilitiesModule) },
  { path: 'configuration', loadChildren: () => import('./pages/configuration/configuration.module').then(m => m.ConfigurationModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'stage', loadChildren: () => import('./pages/stage/stage.module').then(m => m.StageModule) },
  { path: 'explore', loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExploreModule) },
  { path: 'wizard', loadChildren: () => import('./pages/wizard/wizard.module').then(m => m.WizardModule) },
  { path: '', redirectTo: '/about', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
