import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
    name: 'datetransform'
})

export class DateTransform implements PipeTransform {
    transform(value: any, args?: any): any {
        let date = new Date(value);
        return date;
    }
}