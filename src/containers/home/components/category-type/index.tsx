import { useLayoutContext } from '@/layouts/UnAuthLayout';
import { Box, Card, CardContent, CardHeader, styled } from '@mui/material';
import List from '@mui/material/List';
import { equals } from 'rambda';
import { memo, useMemo } from 'react';
import { ICategoryType } from '../..';
import CategoriesItemType from '../categories-item-type';

const CategoryTypeWrapper = styled(Card)(({ theme }) => ({
  position: 'sticky',
  top: '10px',
  height: '800px',
  display: 'block',
  flex: '0 0 24.16666667%',
  maxWidth: '24.16666667%',
  paddingLeft: '0.625rem',
  paddingRight: '0.625rem',
  transition: '.5s ease-in-out',
  '& .MuiList-root': {
    '.activeFirst': {
      color: '#fff',
      backgroundColor: '#f46a6a',
      '.MuiButtonBase-root': {
        color: '#fff',
        backgroundColor: '#f46a6a',
        span: {
          color: '#fff',
        },
      },
      '.MuiTypography-root:': {
        backgroundColor: '#f46a6a',
      },
      ':hover': {
        color: '#fff',
        backgroundColor: '#f46a6a',
      },
    },
  },
  '.active': {
    span: {
      color: 'white',
    },
  },

  '& .active': {
    '.MuiListItemButton-root': {
      color: '#fff',
      backgroundColor: '#f46a6a',
    },
  },

  '&.open': {
    left: 0,
    display: 'block',
  },
  '@media (max-width: 1000px)': {
    position: 'fixed',
    top: '0',
    left: '-100%',
    zIndex: 1001,
    width: '250px',
    height: '100%',
    padding: '0',
    overflowX: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 0,
  },

  '@media (max-width: 768px)': {
    flex: '0 0 50%',
    maxWidth: '100%',
  },
}));

const CardHeaderStyled = styled(CardHeader)(({ theme }) => ({
  marginBottom: 0,
  minHeight: '3rem',
  padding: '0 1.5rem',
  color: 'rgba(0,0,0,.85)',
  fontWeight: 500,
  fontSize: '1rem',
  backgroundColor: 'transparent',
  borderBottom: '1px solid #f0f0f0',
  borderRadius: '2px 2px 0 0',
  '@media (max-width: 1000px)': {
    minHeight: '48px',
    padding: '0 24px',
    borderRadius: '0 0 0 0',
  },
}));

const CardBodyStyled = styled(CardContent)(({ theme }) => ({
  maxHeight: 'calc(100vh - 70px)',
  padding: '10px',
  overflowX: 'auto',
}));

interface CategoryTypeProps {
  categoriesType: ICategoryType[];
}
const CategoryTypeComponent = ({ categoriesType }: CategoryTypeProps) => {
  const { toggleMenu } = useLayoutContext();

  const renderCategoriesType = useMemo(() => {
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="main mailbox folders">
          {categoriesType?.map((_categoriesType: ICategoryType, index) => {
            return (
              <CategoriesItemType
                id={_categoriesType?.id?.toString() ?? ''}
                name={_categoriesType?.name ?? ''}
                key={_categoriesType?.id ?? 0}
                index={index}
                idFirstCategory={categoriesType?.[0]?.id?.toString() ?? ''}
              />
            );
          })}
        </List>
      </Box>
    );
  }, [categoriesType]);

  return (
    <CategoryTypeWrapper className={toggleMenu ? 'open' : ''}>
      <CardHeaderStyled title="Category" />
      <CardBodyStyled>{renderCategoriesType}</CardBodyStyled>
    </CategoryTypeWrapper>
  );
};

export const CategoryType = memo(CategoryTypeComponent, equals);
