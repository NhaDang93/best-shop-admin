import { yupResolver } from '@hookform/resolvers/yup';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { format } from 'date-fns';
import getYear from 'date-fns/getYear';
import { vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { useImportMoneyContext } from '../..';
import SelectMUI from '../../../../components/shared-components/designs/select-form';
import { backgroundStatusContract } from '../../../../utils';
import AddImportMoney from '../buttons/AddImportMoney';

const FilterWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  padding: '16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  alignSelf: 'stretch',
  backgroundColor: 'rgb(255, 255, 255)',
  color: 'rgb(97, 97, 97)',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '16px',
  overflow: 'hidden',
  border: 'none rgba(144, 202, 249, 0.46)',
  boxShadow: 'inherit',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  flexDirection: 'row',
  gap: '16px',
  flexWrap: 'wrap',
  width: '100%',
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
  color: '#212B36',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '133.4%',
}));

const ButtonSearchStyled = styled(Button)(({ theme }) => ({
  display: 'flex',
  padding: '6px 16px',
  backgroundColor: '#FFC20E',
  color: '#454F5B',
  textAlign: 'center',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  textTransform: 'uppercase',
  boxShadow:
    'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
  '&:hover': {
    backgroundColor: '#FFC20E',
    color: '#454F5B',
  },
}));

export enum FilterFormEnum {
  Year = 'Year',
  Month = 'Month',
}

export interface IStatus {
  code: string;
  name: string;
}
export type FilterForm = Record<FilterFormEnum, any>;
const FilterImportMoney = ({
  setImportMoneyFilter,
}: {
  setImportMoneyFilter: (ImportMoneyFilter: FilterForm) => void;
}) => {
  const { t } = useTranslation();

  const { convertListYear, convertListMonth } = useImportMoneyContext();
  const [isShowContent, setIsShowContent] = useState(true);

  const formContext = useForm<FilterForm>({
    defaultValues: {
      [FilterFormEnum.Year]: '',
    },
    resolver: (data, context, options) => {
      return yupResolver(
        yup.object().shape({
          [FilterFormEnum.Year]: yup.string().required(''),
          [FilterFormEnum.Month]: yup.string().notRequired(),
        })
      )(data, context, options as any);
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = formContext;

  useEffect(() => {
    const month = format(new Date(), 'LLL', { locale: vi });
    const year = getYear(new Date());

    if (year) {
      setValue(FilterFormEnum.Year, year);
    }
    if (month) {
      setValue(FilterFormEnum.Month, month);
    }
  }, []);

  const onSubmit = (data: FilterForm) => {
    setImportMoneyFilter({
      Year: data.Year,
      Month: data.Month ?? '',
    });
  };

  const handleShowContent = () => {
    setIsShowContent((pre) => !pre);
  };

  const renderTile = useMemo(() => {
    return (
      <Stack
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <TitleStyled>{t('search_by_type')}</TitleStyled>
        <IconButton onClick={handleShowContent}>
          {isShowContent ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Stack>
    );
  }, [isShowContent]);

  return (
    <FilterWrapper>
      {renderTile}
      <FormContainer
        id="hook-form"
        component="form"
        onSubmit={handleSubmit?.(onSubmit)}
        sx={{
          display: isShowContent ? 'flex' : 'none',
        }}
      >
        <Stack
          justifyContent="center"
          flexDirection="row"
          style={{ width: '100%' }}
          gap="12px"
          sx={{
            '@media (max-width:1024px)': {
              flexWrap: 'wrap',
              gap: '16px',
            },
          }}
        >
          <SelectMUI
            control={control}
            name={FilterFormEnum.Month}
            label={t('select_month')}
            errorMessage={errors?.[FilterFormEnum.Month]?.message as string}
            sx={{
              flex: '1',
              '.MuiInputBase-root': {
                height: '40px',
                fontSize: '16px',
              },
              '.MuiFormLabel-root': {
                fontSize: '19px',
                lineHeight: '1.25em',
              },
            }}
            displayEmpty
            renderValue={(selected) => {
              const backgroundColorStatus = backgroundStatusContract(
                (selected as string) ?? ''
              );

              if (!selected) {
                return <div />;
              }
              return (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Chip
                    sx={{
                      minWidth: '128px',
                      display: 'flex',
                      fontFamily: 'Be VietNam Pro, sans-serif',
                      fontSize: '13px',
                      fontWeight: 400,
                      lineHeight: '18px',
                      letterSpacing: '0.16px',
                      height: '24px',
                      cursor: 'pointer',
                      backgroundColor: backgroundColorStatus,
                    }}
                    key={`${selected}`}
                    label={`${selected}`}
                  />
                </Box>
              );
            }}
          >
            <MenuItem key="empty" value="">
              {t('select_month')}
            </MenuItem>
            {convertListMonth?.map((_convertListMonth) => (
              <MenuItem
                key={_convertListMonth?.id}
                value={_convertListMonth?.name}
              >
                {_convertListMonth?.name}
              </MenuItem>
            ))}
          </SelectMUI>

          <SelectMUI
            control={control}
            name={FilterFormEnum.Year}
            errorMessage={errors?.[FilterFormEnum.Year]?.message as string}
            label={t('select_year')}
            sx={{
              flex: '1',
              '.MuiInputBase-root': {
                height: '40px',
                fontSize: '16px',
              },
              '.MuiFormLabel-root': {
                fontSize: '19px',
                lineHeight: '1.25em',
              },
            }}
            displayEmpty
            renderValue={(selected) => {
              const backgroundColorStatus = backgroundStatusContract(
                (selected as string) ?? ''
              );

              if (!selected) {
                return <div />;
              }
              return (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Chip
                    sx={{
                      minWidth: '128px',
                      display: 'flex',
                      fontFamily: 'Be VietNam Pro, sans-serif',
                      fontSize: '13px',
                      fontWeight: 400,
                      lineHeight: '18px',
                      letterSpacing: '0.16px',
                      height: '24px',
                      cursor: 'pointer',
                      backgroundColor: backgroundColorStatus,
                    }}
                    key={`${selected}`}
                    label={`${selected}`}
                  />
                </Box>
              );
            }}
          >
            <MenuItem key="empty" value="">
              {t('select_year')}
            </MenuItem>
            {convertListYear?.map((_convertListYear) => (
              <MenuItem
                key={_convertListYear?.id}
                value={_convertListYear.name}
              >
                {_convertListYear.name}
              </MenuItem>
            ))}
          </SelectMUI>
        </Stack>
        <Stack
          justifyContent="end"
          flexDirection="row"
          style={{ width: '100%' }}
          gap="12px"
          sx={{
            '@media (max-width:1024px)': {
              flexWrap: 'wrap',
              gap: '16px',
            },
          }}
        >
          <AddImportMoney />
          <ButtonSearchStyled type="submit">{t('search')}</ButtonSearchStyled>
        </Stack>
      </FormContainer>
    </FilterWrapper>
  );
};

export default FilterImportMoney;
