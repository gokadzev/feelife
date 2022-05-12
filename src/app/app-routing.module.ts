import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumPageComponent } from './shared_components/album-page/album-page.component';
import { AlbumsComponent } from './shared_components/albums/albums.component';
import { ArtistPageComponent } from './shared_components/artist-page/artist-page.component';
import { ArtistsComponent } from './shared_components/artists/artists.component';
import { DiscoverComponent } from './shared_components/discover/discover.component';
import { Global50Component } from './shared_components/global50/global50.component';
import { HomeComponent } from './shared_components/home/home.component';
import { ProfileComponent } from './shared_components/profile/profile.component';
import { RecentComponent } from './shared_components/recent/recent.component';
import { SearchComponent } from './shared_components/search/search.component';
import { LanguagesComponent } from './shared_components/settings/languages/languages.component';
import { SettingsComponent } from './shared_components/settings/settings.component';
import { SuggestionsComponent } from './shared_components/suggestions/suggestions.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home',
    data: { state: 'home' }
  },
  {
    path:'home',
    component:HomeComponent,
    data: { state: 'home' }
  },
  {
    path:'logout',
    component:HomeComponent,
    data: { state: 'home' }
  },
  {
    path:'search',
    component:SearchComponent,
    data: { state: 'search' }
  },
  {
    path:'discover',
    component:DiscoverComponent,
    data: { state: 'discover' }
  },
  {
    path:'top50',
    component:Global50Component,
    data: { state: 'top50' }
  },
  {
    path:'suggestions',
    component:SuggestionsComponent,
    data: { state: 'suggestions' }
  },
  {
    path:'recent',
    component:RecentComponent,
    data: { state: 'recent' }
  },
  {
    path:'albums',
    component:AlbumsComponent,
    data: { state: 'albums' }
  },
  {
    path:'album/:album',
    component:AlbumPageComponent,
    data: { state: 'album' }
  },
  {
    path:'artists',
    component:ArtistsComponent,
    data: { state: 'artists' }
  },
  {
    path:'artist-info',
    component:ArtistPageComponent,
    data: { state: 'artistInfo' }
  },
  {
    path:'artist-info/:id',
    component:ArtistPageComponent,
    data: { state: 'artistInfoId' }
  },
  {
    path:'settings',
    component:SettingsComponent,
    data: { state: 'settings' }
  },
  {
    path:'languages',
    component:LanguagesComponent,
    data: { state: 'languages' }
  },
  {
    path:'profile',
    component:ProfileComponent,
    data: { state: 'profile' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
