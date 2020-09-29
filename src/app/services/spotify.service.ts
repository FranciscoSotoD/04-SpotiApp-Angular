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
      'Authorization': 'Bearer BQDwcxYgUtKhpaKEtNol6FrO7f4VrFmfvH92nKCrTgavIsR-ce2lcyrXkBLcBdmaSekaQuvgEOVce7LYl_w'
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

}
