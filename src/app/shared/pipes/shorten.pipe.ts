import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'shorten',
})
export class ShortenStringPipe implements PipeTransform {
  transform(value: string, limit: number = 10, end: string = '...'): string {
    if (value.length > limit) {
      return value.substr(0, limit) + end;
    }
    return value;
  }
}
