import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumPageComponent } from './shared_components/album-page/album-page.component';
import { AlbumsComponent } from './shared_components/albums/albums.component';
import { ArtistPageComponent } from './shared_components/artist-page/artist-page.component';
import { ArtistsComponent } from './shared_components/artists/artists.component';
import { DiscoverComponent } from './shared_components/discover/discover.component';
import { Global50Component } from './shared_components/global50/global50.component';
import { HomeComponent } from './shared_components/home/home.component';
import { PlaylistPageComponent } from './shared_components/playlists/playlist-page/playlist-page.component';
import { PlaylistsComponent } from './shared_components/playlists/playlists.component';
import { ProfileComponent } from './shared_components/profile/profile.component';
import { SearchComponent } from './shared_components/search/search.component';
import { LanguagesComponent } from './shared_components/settings/languages/languages.component';
import { SettingsComponent } from './shared_components/settings/settings.component';
import { SuggestionsComponent } from './shared_components/suggestions/suggestions.component';

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
    path:'discover',
    component:DiscoverComponent
  },
  {
    path:'top50',
    component:Global50Component
  },
  {
    path:'suggestions',
    component:SuggestionsComponent
  },
  {
    path:'playlists',
    component:PlaylistsComponent
  },
  {
    path:'playlist/:playlist',
    component:PlaylistPageComponent
  },
  {
    path:'albums',
    component:AlbumsComponent
  },
  {
    path:'album/:album',
    component:AlbumPageComponent
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
    path:'languages',
    component:LanguagesComponent
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
