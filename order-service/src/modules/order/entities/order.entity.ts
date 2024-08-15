import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    id : UUID

    @Column()
    userId : UUID

    @Column("json")    
    orderProducts : any



}
