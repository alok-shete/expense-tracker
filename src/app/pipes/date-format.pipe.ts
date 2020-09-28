import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any): string {
    const date = new Date(value);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const time = new Intl.DateTimeFormat('en-US', options).format(date);
    return value.toString().split(' ').slice(0, 4).join(' ') + ' ' + time;
  }
}
