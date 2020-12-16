import {
  Body,
  Controller,
  Delete,
  Get,
  // Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  // Redirect,
  // Req,
  // Res,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// import { Request, Response } from 'express';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // EXPRESS-style
  // @Get()
  // // @Redirect('https://google.com', 301)
  // getAll(@Req() req: Request, @Res() res: Response) {
  //   res.status(201).end('getAll()');
  //   // return 'getAll';
  // }
  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @Header('Cache-Сontrol', 'none')
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }

  @Put(':id')
  async update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ) {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (e) {
      return { err: 1, err_msg: e.message, err_stack: e.stack };
    }
  }
}
