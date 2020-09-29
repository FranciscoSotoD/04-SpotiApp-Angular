import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root" // Es como si lo importará automaticamente, sin que esté en el app.module.ts
})

export class SpotifyService {

  constructor( private http: HttpClient) { 
    console.log('Spotify service listo!');
  }

  getQuery( query:string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer QB5UUcAju_XbMSnrvXT9CCxstxKximwNJ5bBu6eXAEfWb7oAxz3NKf-185zsW9ggZwMN4zIp_EGVTBFJPA'
    });

    return this.http.get( url, { headers });

  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
    .pipe( map( data => data['albums'].items ) );   

  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=20`)
    .pipe( map( data => data['artists'].items ) );

  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
    // .pipe( map( data => data['artists'].items ) );

  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
    .pipe( map( data => data['tracks'] ) );

  }

}
