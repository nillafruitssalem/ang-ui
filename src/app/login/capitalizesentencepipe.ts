import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mysentencecapitalize'
})
export class SentenceCapitializePipe implements PipeTransform {

    transform(value: any, ...args: any[]) {
        // console.log(value,"*********")
        console.log(value[0].toUpperCase() + value.slice(1).toLowerCase(),"**********")
        return value[0].toUpperCase() + value.slice(1).toLowerCase()
    }

}