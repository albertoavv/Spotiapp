import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string ){

    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCiBBH48-tpTCkaVivZ-ok8m4uUtHMRsgjkv0NYMq-JKuP7hJ-Q_fIhyqhWpngezm4bjQVzl42pncL6xQY'
    });

    return this.http.get(url, { headers });
  }

  getNewRelease(){

    return this.getQuery('browse/new-releases?limit=20')
               .pipe( map( data => data['albums'].items ));

    /*const headers = new HttpHeaders({ //codigo anterior de obtimizar
      'Authorization': 'Bearer BQDhWbR_CVJrR3xzmbuz301zO_eXadFcZO4TP_5nx4PX1PbGghVbe-3Ex7wEydmXVGnjj1Y8EtKsgaovgZ0'
    });*/

   /* this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers })
                    .pipe( map( data => data['albums'].items ));*/
  }

  getArtistas( termino: string ){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
    .pipe( map( data => data['artists'].items ));

    /*const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDhWbR_CVJrR3xzmbuz301zO_eXadFcZO4TP_5nx4PX1PbGghVbe-3Ex7wEydmXVGnjj1Y8EtKsgaovgZ0'
    })
    return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers })
                    .pipe( map( data => data['artists'].items ));*/
          
  }

  getArtista( id: string ){

    return this.getQuery(`artists/${id}`);

    //.pipe( map( data => data['artists'].items ));

  }

  getToTracks( id: string ){

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
              .pipe( map( data => data['tracks'] ));

  }

}
