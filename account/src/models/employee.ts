import { EmployeeDTO } from "src/dto/employee-dto";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    public static createEmployeeFromEmployeeDTO(employeeDTO: EmployeeDTO):Employee {
        var employee = new Employee();
        employee.name = employeeDTO.name;
        employee.surname = employeeDTO.surname;

        return employee;
    }
}

