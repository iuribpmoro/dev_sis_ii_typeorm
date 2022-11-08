import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
  } from 'typeorm';
import Reservation from './Reservations';
    
  @Entity('court')
  class Court {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column('varchar', { length: 150 })
    name: string;
  
    @Column('varchar', { length: 40 })
    type: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Reservation, reservation => reservation.courts)
    reservations: Reservation[];
  }
  
  export default Court;