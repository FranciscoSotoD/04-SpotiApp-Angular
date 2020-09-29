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
      'Authorization': 'Bearer BQCXXXRRFosVCDI-YFxe15lTzDO2XDf-49XBA6q6lPYWa7l2VWQIk5ho4euiEzL5Vp8nMkOidejRgSbGSo4'
    });

    return this.http.get( url, { headers });

  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
    .pipe( map( data => data['albums'].items ) );   

  }

  getArtista( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=20`)
    .pipe( map( data => data['artists'].items ) );

  }

}
