import { PartnerDTO } from "src/dto/partner-dto";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Partner {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    public static createPartnerFromPartnerDTO(partnerDTO: PartnerDTO):Partner{
        var partner = new Partner();
        partner.name = partnerDTO.name;

        return partner;
    }
}

