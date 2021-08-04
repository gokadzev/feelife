import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared_components/home/home.component';
import { SearchComponent } from './shared_components/search/search.component';
import { DiscoverComponent } from './shared_components/discover/discover.component';
import { AlbumsComponent } from './shared_components/albums/albums.component';
import { ArtistsComponent } from './shared_components/artists/artists.component';
import { RecentComponent } from './shared_components/recent/recent.component';
import { FavouritesComponent } from './shared_components/favourites/favourites.component';
import { SettingsComponent } from './shared_components/settings/settings.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SongComponent } from './shared_components/additional_components/song/song.component';
import { SongCubeComponent } from './shared_components/additional_components/song-cube/song-cube.component';
import { ArtistComponent } from './shared_components/additional_components/artist/artist.component';
import { ArtistPageComponent } from './shared_components/artist-page/artist-page.component';
import { PlaylistComponent } from './shared_components/additional_components/playlist/playlist.component';
import { PlaylistsComponent } from './shared_components/playlists/playlists.component';
import { PlaylistPageComponent } from './shared_components/playlists/playlist-page/playlist-page.component';
import { ProfileComponent } from './shared_components/profile/profile.component';
import { AlbumCubeComponent } from './shared_components/additional_components/album-cube/album-cube.component';
import { AlbumPageComponent } from './shared_components/album-page/album-page.component';
import { Global50Component } from './shared_components/global50/global50.component';
import { SuggestionsComponent } from './shared_components/suggestions/suggestions.component';
import { LanguageComponent } from './shared_components/settings/languages/language/language.component';
import { LanguagesComponent } from './shared_components/settings/languages/languages.component';


export  function  HttpLoaderFactory(http:  HttpClient) {
  return  new  TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    DiscoverComponent,
    AlbumsComponent,
    ArtistsComponent,
    RecentComponent,
    FavouritesComponent,
    SettingsComponent,
    SongComponent,
    SongCubeComponent,
    ArtistComponent,
    ArtistPageComponent,
    PlaylistComponent,
    PlaylistsComponent,
    PlaylistPageComponent,
    ProfileComponent,
    AlbumCubeComponent,
    AlbumPageComponent,
    Global50Component,
    SuggestionsComponent,
    LanguageComponent,
    LanguagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { 

}
