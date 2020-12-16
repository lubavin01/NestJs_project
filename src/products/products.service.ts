import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }
  private products = [];

  async getAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(productDto);
    return await product.save();
    // this.products.push({
    //   ...productDto,
    //   id: Date.now().toString(),
    // });
  }

  async remove(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }

  async update(id: string, productDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, productDto);
  }
}
