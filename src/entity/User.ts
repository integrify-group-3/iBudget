import { Entity, PrimaryGeneratedColumn, Column, getRepository } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0

  @Column()
  firstName: string = 'emeak'

  @Column()
  lastName: string = 'es'

  @Column()
  age: number = 3
}
