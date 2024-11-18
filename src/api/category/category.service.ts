import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseDto } from 'src/common/dto/http-response.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { QueryPaginationDto } from 'src/common/dto/pagination-dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseDto<Category>> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });
    if (existingCategory) {
      throw new HttpException('Danh mục đã tồn tại', HttpStatus.CONFLICT);
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(newCategory);
    return { message: 'Thêm danh mục thành công', data: newCategory };
  }

  async findAll(query: QueryPaginationDto): Promise<ResponseDto<Category[]>> {
    const { page, limit, search, sort, sortOrder } = query;
    const skip = (+page - 1) * limit;
    const [data, total] = await this.categoryRepository.findAndCount({
      take: limit,
      skip: skip,
      where: search ? { name: Like(`%${search}%`) } : {},
      order: { [sort]: sortOrder },
    });
    const totalPages = Math.ceil(total / limit);

    return {
      message: 'Lấy danh sách danh mục thành công',
      data,
      meta: {
        currentPage: +page,
        totalItems: total,
        totalPages,
        itemsPerPage: limit,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
