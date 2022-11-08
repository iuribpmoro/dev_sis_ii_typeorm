import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
  } from 'typeorm';
import Client from './Clients';
import Court from './Courts';
    
  @Entity('reservation')
  class Reservation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('decimal')
    value: number;

    @Column('boolean', { default: false })
    confirmed: boolean;

    @Column()
    begin_datetime: Date;
    
    @Column()
    end_datetime: Date;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    client_cpf: string;
    
    @Column()
    court_id: number;
    
    @ManyToOne(() => Client, client => client.cpf)
    clients: Client[];
    

    @ManyToOne(() => Court, court => court.id)
    courts: Court[];


  }
  
  export default Reservation;