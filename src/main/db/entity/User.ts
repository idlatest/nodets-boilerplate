import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id!:number
  
  @Column({
    nullable: false,
    unique: true
  })
  email!:string
  
  @Column()
  passhash!:string
  
  @Column({ nullable: true })
  firstName!:string
  
  @Column({ nullable: true })
  lastName!:string
}