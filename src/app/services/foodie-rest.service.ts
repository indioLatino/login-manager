import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';
import {FoodieUser} from '../models/foodie-user';

@Injectable({
  providedIn: 'root'
})
export class FoodieRestService {
  //todo: Use environment variable instead
  readonly endpoint = 'http://localhost:1234/user/';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public addUser(user: FoodieUser): Observable<any> {
    console.log('User to be stored: ' + user);
    return this.http.post<any>(this.endpoint + 'create', JSON.stringify(user), this.httpOptions).pipe(
      tap((user) => console.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
