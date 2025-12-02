import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly service;
    constructor(service: ProductsService);
    create(dto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<Omit<import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, dto: UpdateProductDto): Promise<import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
