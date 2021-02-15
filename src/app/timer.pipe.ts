import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timer' })
export class TimerPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) return '-';

    const seconds = Math.floor((value / 1000) % 60);
    const minutes = Math.floor(value / 60000);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
