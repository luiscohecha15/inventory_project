import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "./category.schema";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(dto: { name: string }) {
    const created = new this.categoryModel(dto);
    return created.save();
  }

  async findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const cat = await this.categoryModel.findById(id).exec();
    if (!cat) throw new NotFoundException("Category not found");
    return cat;
  }

  async update(id: string, dto: Partial<{ name: string }>) {
    const updated = await this.categoryModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException("Category not found");
    return updated;
  }

  async remove(id: string) {
    const res = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException("Category not found");
    return res;
  }
}
