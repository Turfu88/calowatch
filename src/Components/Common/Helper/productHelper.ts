import { v4 as uuidv4 } from 'uuid';

export type Product = {
    id?: string,
    name: string,
    hasImage: boolean,
    imageUrl?: string,
    kcal100g: number,
    barCode: string | null,
}

export const productHelper = {
    post: function(product: Product) {
        product.id = uuidv4();
        const allproducts = localStorage.getItem('product');
        if (allproducts === null) {
            localStorage.setItem('product', JSON.stringify([product]));
            return;
        }
        localStorage.setItem('product', JSON.stringify([...JSON.parse(allproducts), product]));
    },
    getc: function(): Product[] | null {
        const allproducts = localStorage.getItem('product');
        if (allproducts === null) {
            return null;
        }

        return JSON.parse(allproducts);
    },
    get: function(id: string): Product | null {
        const allproducts = localStorage.getItem('product');
        if (allproducts === null) {
            return null;
        }
        const productFound = JSON.parse(allproducts).find((product: Product) => product.id === id);
        if (productFound === undefined) {
            return null;
        }
        return productFound;
    },
    update: function(updatedProduct: Product) {
        const allproducts = localStorage.getItem('product');
        if (allproducts === null) {
            return;
        }
        const updatedProducts = JSON.parse(allproducts).map((product: Product) => {
            if (product.id === updatedProduct.id){
                return updatedProduct;
            }
            return product;
        })
        localStorage.setItem('product', updatedProducts.toString());
    },
    delete: function(id: string) {
        const allProducts = localStorage.getItem('product');
        if (allProducts === null) {
            return;
        }
        const updatedProducts = JSON.parse(allProducts).filter((product: Product) => product.id !== id)
        localStorage.setItem('product', updatedProducts.toString());
    }

}