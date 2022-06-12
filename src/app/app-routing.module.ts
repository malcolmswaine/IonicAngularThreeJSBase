import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SceneOneComponent } from './scene-one/scene-one.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'scene-one',
    pathMatch: 'full'
  },
  {
    path: 'scene-one',
    component: SceneOneComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
