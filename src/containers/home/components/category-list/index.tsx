import FormSearchComponent from '@/components/shared-components/menu-app-bar/components/FormSearch';
import { Card, Theme, styled, useMediaQuery } from '@mui/material';
import { equals } from 'rambda';
import { memo } from 'react';
import { Element } from 'react-scroll';
import { ICategory } from '../..';
import { CategoryTable } from '../tables/Category';

interface CategoryListProps {
  categories: ICategory[];
}

const CategoryListWrapper = styled(Card)(({ theme }) => ({
  width: '41.66666667%',
  paddingBottom: '100px',

  '@media (max-width: 900px)': {
    '.desktop': {
      display: 'none',
    },
  },
  '@media (max-width: 1200px)': {
    display: 'block',
    flex: '0 0 100%',
    maxWidth: '100%',
  },
  '@media (max-width: 576px)': {
    display: 'block',
    flex: '0 0 100%',
    maxWidth: '100%',
  },
}));

const CategoryListComponent = ({ categories }: CategoryListProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <CategoryListWrapper>
      <div style={{ display: isMobile ? ' none' : '' }}>
        <FormSearchComponent />
      </div>

      {categories?.map((item: ICategory, index: number) => {
        if (item?.products && item?.products?.length > 0) {
          return (
            <Element key={item?.category_id} name={`${item.category_id}`}>
              <CategoryTable category={[item]} index={index} />
            </Element>
          );
        }
        return <div key={item?.category_id} />;
      })}
    </CategoryListWrapper>
  );
};

export const CategoryList = memo(CategoryListComponent, equals);
