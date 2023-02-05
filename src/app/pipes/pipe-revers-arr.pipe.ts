import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "../shared/Interfaces";

@Pipe({
  name: 'pipeReversArr'
})
export class PipeReversArrPipe implements PipeTransform {
  // private compareFn!: Post[];

  transform(value: Post[], revers: boolean): Post[] {
    if (!revers) {
      return value
    } else {

      //проверить что выводиться при парсинге даты, должно быть число, так как сорт должен вернуть число

      // return value.sort(this.compareFn?: ((a: Post, b: Post) => new Date.parse(b.date) - new Date.parse(a.date))):    Post[]
        // (a, b) => new Date(b.date) - new Date(a.date))
      return value

    }
  }

}
