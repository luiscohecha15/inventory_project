import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.schema";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(dto: any) {
    const created = new this.productModel(dto);
    return created.save();
  }

  async findAll() {
    return this.productModel.find().populate("category_id").exec();
  }

  async findOne(id: string) {
    const p = await this.productModel
      .findById(id)
      .populate("category_id")
      .exec();
    if (!p) throw new NotFoundException("Product not found");
    return p;
  }

  async update(id: string, dto: any) {
    const updated = await this.productModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException("Product not found");
    return updated;
  }

  async remove(id: string) {
    const res = await this.productModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException("Product not found");
    return res;
  }
}
