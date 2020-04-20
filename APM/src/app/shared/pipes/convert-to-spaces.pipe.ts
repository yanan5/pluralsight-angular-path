import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    const strToReplace = /-/gi;
    const replaceStr = args[0];
    return value.replace(strToReplace, replaceStr);
  }

}
