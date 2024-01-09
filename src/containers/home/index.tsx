import Loading from '@/components/shared-components/loading';
import { productList, search } from '@/store/slices/app';
import { removeAccents } from '@/utils';
import { styled } from '@mui/material';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import CartCategory from './components/cart-category';
import { CategoryList } from './components/category-list';
import { CategoryType } from './components/category-type';
import { homeData } from './mockData';

const HomeWrapper = styled('div')(({ theme }) => ({
  marginTop: '3rem',
}));

const BodyContainer = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '1.5rem',

  '@media (max-width: 576px)': {
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
  },
}));

export interface IProduct {
  id: number;
  name?: string;
  unit?: string;
  unit_price?: number;
  stock?: number;
  brand?: string;
  origin?: string;
  description?: string;
  stock_alert?: number;
  image?: {
    name?: string;
    url?: string;
    logo_print?: string | null;
  }[];
}

export interface ICategory {
  category_id?: number;
  category_name?: string;
  count_products?: number;
  products?: IProduct[];
}

export interface ICategoryType {
  id?: number;
  name?: string;
}

const HomeComponent = () => {
  const searchSelector: string = useSelector(search);
  const productsSelector = useSelector(productList);

  const [categories, setCategories] = useState<ICategory[]>();
  const [categoriesType, setCategoriesType] = useState<ICategoryType[]>();
  const test = async () => {
    const data = await axios
      .post(
        'http://113.161.76.226:8087/hdb-sale-portal/api/getListStatusContact',
        {
          channelId: 'PORTAL',
          partnerId: 'SALE_PORTAL',
          requestId: '33f6b494-0bfd-403e-ab17-962e4af20229',
          requestTime: '2023-08-03 11:27:02',
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    test();
    setCategoriesType(homeData?.data?.data?.categories as ICategoryType[]);
  }, [homeData]);

  useEffect(() => {
    setCategories(productsSelector);
  }, [productsSelector]);

  useEffect(() => {
    const filterProducts = ({ _search }: { _search: string }) => {
      let productsProcess: ICategory[] = productsSelector ?? [];
      if (_search) {
        productsProcess = productsProcess?.map((_product) => {
          const _productCopy = _product.products?.filter((_p) => {
            return removeAccents(_p?.name?.toUpperCase() ?? '')?.includes(
              removeAccents(_search?.toUpperCase() ?? '')
            );
          });

          return {
            category_id: _product.category_id,
            category_name: _product.category_name,
            count_products: _product.count_products ?? 0,
            products: _productCopy,
          };
        });
        setCategories(productsProcess ?? []);
      } else {
        setCategories(productsSelector as ICategory[]);
      }
    };
    filterProducts({
      _search: searchSelector,
    });
  }, [searchSelector]);

  const renderCategoryType = useMemo(() => {
    return <CategoryType categoriesType={categoriesType ?? []} />;
  }, [categoriesType]);

  const renderCategoryList = useMemo(() => {
    return <CategoryList categories={categories ?? []} />;
  }, [categories]);

  const renderCategoryCart = useMemo(() => {
    return <CartCategory />;
  }, []);

  return (
    <HomeWrapper>
      {(!categories || !categories?.length || !categoriesType?.length) && (
        <Loading />
      )}

      <BodyContainer>
        {renderCategoryType}
        {renderCategoryList}
        {renderCategoryCart}
      </BodyContainer>
    </HomeWrapper>
  );
};

export const Home = HomeComponent;
