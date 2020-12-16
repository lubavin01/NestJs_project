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
  getAll(): any[] {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @Header('Cache-Сontrol', 'none')
  create(@Body() createProductDto: CreateProductDto): void {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `remove ${id}`;
  }

  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return `update title: ${updateProductDto.title} price: ${updateProductDto.price} id: ${id}`;
  }
}
