import { defer, fromEvent, startWith, type Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function media(query: string): Observable<boolean> {
  const mediaQuery = window.matchMedia(query);
  return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
    startWith(mediaQuery),
    map((list: MediaQueryList) => list.matches)
  );
}

export function startWithTap<T>(callback: () => void) {
  return (source: Observable<T>) =>
    defer(() => {
      callback();
      return source;
    });
}
