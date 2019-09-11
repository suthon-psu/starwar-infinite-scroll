import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PeopleQueryResult } from '../models/people';
import { HttpClient } from '@angular/common/http';
import { map, switchAll } from 'rxjs/operators'

interface PeopleQuery {
  page: number
}

@Injectable({
  providedIn: 'root'
})
export class StarWarService {
  private querySubject: Subject<PeopleQuery>
  constructor(
    private http: HttpClient,
  ) {     
    this.querySubject = new Subject<PeopleQuery>()
  }

  getPeople(): Observable<PeopleQueryResult>{
    const selector = ({page}) => {
      let url = `https://swapi.co/api/people/?page=${page}`
      return this.http.get(url).pipe(
        map(data => {
          return {
            hasNext: data['next'] != null,
            results: data['results']
          }
        })
      )
    }
    
    return this.querySubject.pipe(
      map(query => selector(query)),
      switchAll()
    )
  }

  loadPeople(query: PeopleQuery) {
    this.querySubject.next(query)    
  }
}
