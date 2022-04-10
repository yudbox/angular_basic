import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtered',
  pure: false,
})
export class FilteredPipe implements PipeTransform {
  transform(
    value: string[],
    filteredString: string,
    propName: string
  ): string[] {
    if (value.length === 0 || filteredString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filteredString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
