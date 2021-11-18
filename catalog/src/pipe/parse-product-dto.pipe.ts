import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ProductDTO } from 'src/dto/product-dto';

@Injectable()
export class ParseProductDtoPipe implements PipeTransform {

  transform(product: 
    {name:string,price:number,category:string,description:string,partnerID:string, ingredient:string,dimension:string}, 
    metadata: ArgumentMetadata):ProductDTO
  {
    if(!(product.name && product.price && product.category && product.description && product.partnerID && product.ingredient && product.dimension)){
      throw new Error("Invalid product DTO " + JSON.stringify(product));
    }

    var productDTO = new ProductDTO(
      product.name,
      +product.price,
      product.category,
      product.description,
      product.partnerID,
      product.ingredient,
      product.dimension);
    
    return productDTO;
  }
}
