import { ProductModel } from '@/components/shared-components/QuantityCart';
import { useEffect, useState } from 'react';

const CARTS = 'Carts';
export function useCart() {
  const [carts, setCarts] = useState<ProductModel[]>([]);

  useEffect(() => {
    getCarts();
  }, []);

  const addCartStorage = (rowCart: ProductModel[]) => {
    localStorage.setItem(CARTS, JSON.stringify(rowCart));
  };

  const clearAllCart = () => {
    addCartStorage([]);
    setCarts([]);
  };

  function findProductYourCart(id: number) {
    const productsDefault: ProductModel[] = carts ?? [];

    return productsDefault?.filter((_productDefault) => {
      return id !== _productDefault?.id;
    });
  }
  function getCarts() {
    const stored: ProductModel[] = JSON.parse(
      (localStorage.getItem(CARTS) ? localStorage.getItem(CARTS) : '[]') ?? '[]'
    );
    setCarts(stored ?? []);
  }

  async function addCart(product: ProductModel[]) {
    const productsDefault: ProductModel[] = carts ?? [];

    let findProduct: ProductModel[] = [];
    if (typeof productsDefault !== undefined && product !== undefined) {
      findProduct = productsDefault?.filter((_productDefault) => {
        return product?.[0]?.id === _productDefault?.id;
      });

      if (!findProduct?.length && product?.[0].cart?.qty !== 0) {
        addCartStorage([...carts, ...product]);
        setCarts([...carts, ...product]);
      } else if (findProduct?.length > 0) {
        if (
          product?.[0] &&
          product?.[0] !== undefined &&
          (product?.[0].cart?.qty === 0 ||
            product?.[0].cart?.qty === null ||
            product?.[0].cart?.qty === undefined)
        ) {
          const _productsDefault =
            productsDefault?.filter((_productDefault) => {
              return product?.[0]?.id !== _productDefault?.id;
            }) ?? [];
          addCartStorage([..._productsDefault]);

          setCarts([..._productsDefault]);
        } else {
          let data: ProductModel[] = [];
          product.forEach((i) => {
            data = productsDefault.filter((_productDefault) => {
              return _productDefault?.id !== i?.id;
            });
          });

          addCartStorage([...data, ...product]);

          setCarts([...data, ...product]);
        }
      }
    }
  }

  return { addCart, carts, findProductYourCart, clearAllCart };
}
