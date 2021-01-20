import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number = 0

  @Column()
  name: string = ''

  @Column('int')
  publishedYear!: number

  @Column('varchar', { length: 250, array: true, nullable: true })
  genres: string[] = []

  @Column('int')
  duration: number = 0

  @Column('int')
  rating: number = 0

  @Column('varchar', { length: 50, nullable: true, unique: true })
  characters: string = ''
}
