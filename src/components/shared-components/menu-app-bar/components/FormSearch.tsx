import { dispatch } from '@/store/app-dispatch';
import { search, setSearch } from '@/store/slices/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, styled } from '@mui/material';
import { useEffect } from 'react';
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

const SearchStyled = styled('label')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  lineHeight: theme.spacing(16),
  padding: '16px',
}));

export enum SearchFormEnum {
  searchForm = 'search',
}
export type SearchForm = Record<SearchFormEnum, string | undefined | null>;

const FormSearchComponent = () => {
  const searchSelector: string = useSelector(search);

  const formContext = useForm<SearchForm>({
    defaultValues: {
      search: '',
    },
    resolver: (data, context, options) => {
      return yupResolver(
        yup.object().shape({
          search: yup.string().notRequired(),
        })
      )(data, context, options);
    },
    mode: 'onChange',
  });

  const onSubmit = (data: SearchForm) => {
    dispatch(setSearch(data?.search ?? ''));
  };
  const handleReset = () => {
    dispatch(setSearch(''));
  };

  useEffect(() => {
    if (formContext.watch(SearchFormEnum.searchForm) !== searchSelector) {
      formContext.setValue(SearchFormEnum.searchForm, searchSelector ?? '');
    }
  }, [searchSelector]);

  return (
    <FormContainer onSuccess={onSubmit} formContext={formContext}>
      <SearchStyled>
        <TextFieldElement
          variant="outlined"
          fullWidth
          name={SearchFormEnum.searchForm}
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: (theme) => theme.spacing(2),
            'MuiOutlinedInput-root': {
              height: (theme) => theme.spacing(4),
            },
            input: {
              padding: '10px 14px',
            },
          }}
        />
        <Button
          variant="contained"
          color="error"
          type="submit"
          sx={{ marginLeft: (theme) => theme.spacing(4) }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginLeft: (theme) => theme.spacing(4) }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </SearchStyled>
    </FormContainer>
  );
};

export default FormSearchComponent;
