import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'morning-dhikr',
    loadChildren: () =>
      import('./dhikr/morning-dhikr/morning-dhikr.module').then(
        (m) => m.MorningDhikrPageModule
      ),
  },
  {
    path: 'evening-dhikr',
    loadChildren: () =>
      import('./dhikr/evening-dhikr/evening-dhikr.module').then(
        (m) => m.EveningDhikrPageModule
      ),
  },
  {
    path: 'dhikr-before-sleeping',
    loadChildren: () =>
      import('./dhikr/dhikr-before-sleeping/dhikr-before-sleeping.module').then(
        (m) => m.DhikrBeforeSleepingPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./dhikr/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: 'counter',
    loadChildren: () => import('./dhikr/counter/counter.module').then( m => m.CounterPageModule)
  },
  {
    path: 'benefits',
    loadChildren: () => import('./dhikr/benefits/benefits.module').then( m => m.BenefitsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
