import { uploadToCloudinaryImage } from "@/helpers/cloudinary";
import { Product } from "@/models/product.model.js";

interface productPayload {
    name: string;
    description: string;
    price: number;
    stock: number;
    productImg: File;
}

const createProduct = async(payload: productPayload) => {
    try {
        const { name, description, price, stock, productImg } = payload;
        if(!name || !description || price === undefined || stock === undefined || !productImg){
            throw new Error("All fields are required");
        };
        let image;
        if(productImg){
            const buffer = Buffer.from(await productImg.arrayBuffer());
            const file = await uploadToCloudinaryImage(buffer, "productImages");
            image = (await file).secure_url
        }

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            productImg: image
        });

        if(!product) throw new Error("Error occured while creating product");
        return product;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

const editProduct = async (payload: productPayload, id: string) => {
    try {
        const {name, description, price, stock, productImg} = payload;
        if(!name && !description && price === undefined && stock === undefined && !productImg){
            throw new Error("Atleast one field is required");
        };
        let image;
        if(productImg){
            const buffer = Buffer.from(await productImg.arrayBuffer());
            const file = await uploadToCloudinaryImage(buffer, "productImages")
            image = file.secure_url;
        }
        const updateData: any = {}
        if(name) updateData.name = name;
        if(description) updateData.description = description;
        if(price !== undefined) updateData.price = price;
        if(stock !== undefined) updateData.stock = stock;
        if(productImg) updateData.productImg = image;
        const product = await Product.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true
            }
        );
        if(!product) throw new Error("Error occured while updating product");
        return product;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

const deleteProduct = async (id: string) => {
    try {
        const product = await Product.findByIdAndDelete(id);
        if(!product) throw new Error("Error occured while deleting product");
        return true;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const getProduct = async (id: string) => {
    try {
        const product = await Product.findById(id);
        if(!product) throw new Error("Product not found");
        return product;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

const getAllProducts = async () => {
    try {
        const products = await Product.find();
        if(products.length === 0) throw new Error("No Products");
        return products;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export {
    createProduct,
    editProduct,
    deleteProduct,
    getProduct,
    getAllProducts
}