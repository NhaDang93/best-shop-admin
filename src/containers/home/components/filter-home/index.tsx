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
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { Image } from '../../../../components/shared-components/Image';
import InputForm from '../../../../components/shared-components/designs/input-form';

import { useGetListYearMutation } from '../../../../apis/common';
import DateRangePickerCustom from '../../../../components/shared-components/designs/date-range-picker';
import SelectMUI from '../../../../components/shared-components/designs/select-form';
import { FORMAT_DD_MM_YYYY_V2 } from '../../../../constants';
import { IFilterCustomerParams, IYearItem } from '../../../../types';
import {
  backgroundStatusContract,
  filterItemStatusContract,
} from '../../../../utils';
import { IDateRangePicker3 } from '../DateRangPicker';

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

const UpIcon = styled(Image)(({ theme }) => ({
  height: '40px',
  width: '40px',
  cursor: 'pointer',
  padding: '8px',
}));

const label = { inputProps: { 'aria-label': 'Checkbox' } };

export enum FilterFormEnum {
  Status = 'Status',
  CIF = 'CIF',
}

export interface IStatus {
  code: string;
  name: string;
}
export type FilterForm = Record<FilterFormEnum, any>;
const FilterHome = ({
  customerFilter,
  setCustomerFilter,
}: {
  customerFilter: IFilterCustomerParams;
  setCustomerFilter: (customerFilter: IFilterCustomerParams) => void;
}) => {
  const [getStatusContact, getStatusContactRes] = useGetListYearMutation();

  const [dateSelected, setDateSelected] = useState<IDateRangePicker3 | null>({
    endDate: new Date(),
    startDate: new Date(),
  });

  const [isShowContent, setIsShowContent] = useState(true);

  useEffect(() => {
    const handleFetchCommonData = async () => {
      await getStatusContact({
        requestId: uuidv4() as string,
        partnerId: 'SALE_PORTAL',
        channelId: 'PORTAL',
        requestTime: '2023-08-03 11:27:02',
      }).unwrap();
    };
    handleFetchCommonData();
  }, []);

  const formContext = useForm<FilterForm>({
    defaultValues: {
      [FilterFormEnum.Status]: '',
      [FilterFormEnum.CIF]: '',
    },
    resolver: (data, context, options) => {
      return yupResolver(
        yup.object().shape({
          [FilterFormEnum.Status]: yup.string().notRequired(),
          [FilterFormEnum.CIF]: yup
            .string()
            .notRequired()
            .max(250, 'Must be exactly 250 digits'),
        })
      )(data, context, options as any);
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = formContext;
  const convertDataStatus = useMemo(() => {
    const data = getStatusContactRes?.data as IYearItem[];

    return (
      data?.map((_data) => {
        return {
          label: _data?.yearName,
          id: _data?.id,
          name: _data?.yearName,
        };
      }) || null
    );
  }, [getStatusContactRes?.data]);

  const onSubmit = (data: FilterForm) => {
    const filterStatus = filterItemStatusContract(
      convertDataStatus,
      data?.Status
    );
    setCustomerFilter({
      ...customerFilter,
      cif: data?.CIF ?? '',
      statusContact: filterStatus?.id ?? '',
      fromDate:
        dayjs(dateSelected?.startDate)
          .format(FORMAT_DD_MM_YYYY_V2)
          ?.replace(/\s/g, '') ?? '',
      toDate:
        dayjs(dateSelected?.endDate)
          .format(FORMAT_DD_MM_YYYY_V2)
          ?.replace(/\s/g, '') ?? '',
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
        <TitleStyled>Tìm kiếm theo yêu cầu</TitleStyled>
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
          <InputForm
            label=""
            control={control}
            name={FilterFormEnum.CIF}
            placeholder="Số CIF"
          />

          <SelectMUI
            control={control}
            name={FilterFormEnum.Status}
            label="Chọn trạng thái"
            sx={{
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
              Chọn trạng thái
            </MenuItem>
            {convertDataStatus?.map((_convertDataStatus) => (
              <MenuItem
                key={_convertDataStatus?.id}
                value={_convertDataStatus.name}
              >
                {_convertDataStatus.name}
              </MenuItem>
            ))}
          </SelectMUI>

          <DateRangePickerCustom
            setDateSelected={setDateSelected}
            dateSelected={dateSelected}
          />
        </Stack>
        <Stack
          flexDirection="row"
          style={{ width: '100%' }}
          justifyContent="end"
        >
          <ButtonSearchStyled type="submit">Tìm kiếm</ButtonSearchStyled>
        </Stack>
      </FormContainer>
    </FilterWrapper>
  );
};

export default FilterHome;
