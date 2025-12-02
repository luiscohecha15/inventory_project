import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly service;
    constructor(service: CategoriesService);
    create(dto: CreateCategoryDto): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
