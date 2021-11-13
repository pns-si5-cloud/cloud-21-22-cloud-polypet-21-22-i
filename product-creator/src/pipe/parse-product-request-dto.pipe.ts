import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ProductRequestDTO } from 'src/dto/product-request-dto';

@Injectable()
export class ParseProductRequestDtoPipe implements PipeTransform {

  transform(productRequest: 
    {name:string, price:number, category:string, description:string, partnerID:string, ingredient:string, dimension:string}, 
    metadata: ArgumentMetadata) : ProductRequestDTO
  {
    if(!(productRequest && productRequest.name && productRequest.price && productRequest.category && productRequest.description && productRequest.partnerID && productRequest.ingredient && productRequest.dimension)){
      throw new Error("Invalide product request DTO : " + JSON.stringify(productRequest));
    }

    var productRequestDTO = new ProductRequestDTO(
      productRequest.name,
      +productRequest.price,
      productRequest.category,
      productRequest.description,
      productRequest.partnerID,
      productRequest.ingredient,
      productRequest.dimension);
    
    return productRequestDTO;
  }
}
