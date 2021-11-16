import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CustomerDTO } from 'src/dto/customer-dto';

@Injectable()
export class ParseCustomerDtoPipe implements PipeTransform {

  transform(customer: 
    {name:string,surname:string,address:string,mail:string, username:string,password:string}, 
    metadata: ArgumentMetadata):CustomerDTO
  {
    if(!(customer && customer.name && customer.surname && customer.address && customer.mail && customer.username && customer.password)){
      throw new Error("Invalid customer DTO " + JSON.stringify(customer));
    }

    var customerDTO = new CustomerDTO(
      customer.name,
      customer.surname,
      customer.address,
      customer.mail,
      customer.username,
      customer.password);
    
    return customerDTO;
  }
}
