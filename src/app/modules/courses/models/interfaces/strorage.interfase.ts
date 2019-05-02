import { Observable } from "rxjs";

export interface Storage<T> {
  load<U>(opts: U): Observable<T | T[]>;
  save(data: T): Observable<T | boolean>;
  update(data: T, id: string): Observable<T | boolean>;
  delete(id: string): Observable<string | boolean>;
}
