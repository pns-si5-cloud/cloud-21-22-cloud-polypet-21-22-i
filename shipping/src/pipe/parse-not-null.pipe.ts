import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseNotNullPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    
    if(!value) {
      throw new Error("Value is null :" + value);
    }
    return value;
  }
}
