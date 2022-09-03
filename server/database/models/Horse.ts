import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "horse_stables" })
export class Horse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cid: number;

  @Column({ length: 10 })
  horseName: string;

  @Column({ type: "json", default: "[]" })
  metadata: any;

  @Column({ type: "json", default: "[]" })
  components: any;

  @Column()
  stored: boolean;

  @Column()
  model: number;

  @Column()
  position: number;

  @Column({ length: 20 })
  stable: string;

  @Column()
  isActive: boolean;
}
