import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    OneToMany,
  } from 'typeorm';
import Reservation from './Reservations';
    
  @Entity('client')
  class Client {
    @PrimaryColumn('varchar', { length: 11 })
    cpf: string;
  
    @Column('varchar', { length: 150 })
    name: string;
  
    @Column('varchar', { length: 40 })
    phone: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Reservation, reservation => reservation.clients)
    reservations: Reservation[];
  }
  
  export default Client;