import { Product } from 'src/api/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column()
  typeId: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
