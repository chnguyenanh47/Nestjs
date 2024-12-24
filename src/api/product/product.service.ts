import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseDto } from 'src/common/dto/http-response.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { Repository } from 'typeorm';
import { Image } from '../entities/image/image.entity';
import { log } from 'console';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<ResponseDto<any>> {
    const { categoryIds, images, ...productData } = createProductDto;

    // Tạo sản phẩm
    const newProduct = this.productRepository.create(productData);
    await this.productRepository.save(newProduct);

    // Gán danh mục cho sản phẩm
    if (categoryIds) {
      const categories = await this.categoryRepository.findByIds(categoryIds);
      newProduct.categories = categories;
      await this.productRepository.save(newProduct);
    }

    // Gán hình ảnh cho sản phẩm
    if (images) {
      const imageEntities = images.map((imageUrl) => {
        const image = new Image();
        image.url = imageUrl;
        image.product = newProduct;
        image.type = 'product';
        image.typeId = newProduct.id;
        return image;
      });

      await this.imageRepository.save(imageEntities);
    }
    return { message: 'Product created successfully', data: newProduct };
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
