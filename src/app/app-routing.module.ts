import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './shared_components/albums/albums.component';
import { ArtistPageComponent } from './shared_components/artist-page/artist-page.component';
import { ArtistsComponent } from './shared_components/artists/artists.component';
import { HomeComponent } from './shared_components/home/home.component';
import { ProfileComponent } from './shared_components/profile/profile.component';
import { SearchComponent } from './shared_components/search/search.component';
import { SettingsComponent } from './shared_components/settings/settings.component';

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
    path:'albums',
    component:AlbumsComponent
  },
  {
    path:'artists',
    component:ArtistsComponent
  },
  {
    path:'artist-info',
    component:ArtistPageComponent
  },
  {
    path:'artist-info/:id',
    component:ArtistPageComponent
  },
  {
    path:'settings',
    component:SettingsComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
