import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { EmployeeDTO } from 'src/dto/employee-dto';

@Injectable()
export class ParseEmployeeDtoPipe implements PipeTransform {

  transform(employee: 
    {name:string,surname:string, username:string,password:string}, 
    metadata: ArgumentMetadata):EmployeeDTO
  {
    if(!(employee && employee.name && employee.surname && employee.username && employee.password)){
      throw new Error("Invalid employee DTO " + JSON.stringify(employee));
    }

    var employeeDTO = new EmployeeDTO(
      employee.name,
      employee.surname,
      employee.username,
      employee.password);
    
    return employeeDTO;
  }
}
