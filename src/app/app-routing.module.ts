import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistPageComponent } from './shared_components/artist-page/artist-page.component';
import { ArtistsComponent } from './shared_components/artists/artists.component';
import { HomeComponent } from './shared_components/home/home.component';
import { SearchComponent } from './shared_components/search/search.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'search',
    component:SearchComponent
  },
  {
    path:'artists',
    component:ArtistsComponent
  },
  {
    path:'artist-info',
    component:ArtistPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
