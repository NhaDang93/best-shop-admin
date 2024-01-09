import {
  Box,
  FormControl,
  Popover,
  PopoverProps,
  Stack,
  TextField,
  styled,
} from '@mui/material';
import {
  addDays,
  addMonths,
  addYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { vi } from 'date-fns/locale';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  DateRange,
  DefinedRange,
  RangeKeyDict,
  StaticRange,
} from 'react-date-range';
import { FORMAT_DD_MM_YYYY } from '../../../../constants';
import { Image } from '../../Image';

const OutlinedInputWrapper = styled('div')(({ theme }) => ({
  alignSelf: 'stretch',
  borderRadius: '4px',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  boxSizing: 'border-box',
  padding: '0 12px',
  height: '40px',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  position: 'relative',
  '.lineUp': {
    animation: '2s anim-lineUp ease-out infinite',
  },
  '@keyframes anim-lineUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(80%)',
    },
    '20%': {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
      transform: 'translateY(0%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0%)',
    },
  },
}));

const OutlinedInputContainerStyled = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '2px',
  display: 'flex',
  flexDirection: 'row',
  padding: '0 4px',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: '-5px',
}));

const OutlinedInputLabelStyled = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'block',
  position: 'relative',
  letterSpacing: '0.15px',
  lineHeight: '1.4375em',
  paddingLeft: '8px',
  paddingRight: '8px',
  fontSize: '16px',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontWeight: 400,
  color: '#6E6B7B',
}));

const OutlinedInputStyled = styled('div')(({ theme }) => ({
  alignSelf: 'stretch',
  height: '36px',
  display: 'flex',
  flexDirection: 'row',
  padding: '20px 0',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '8px',
  fontSize: '16px',
  fontFamily: 'Be VietNam Pro, sans-serif',
}));

const DateRangeStyled = styled(DateRange)(({ theme }) => ({
  '.rdrDayToday .rdrDayNumber span:after': {
    background: '#FFC20E',
  },
}));

interface DateRangePickerCustomProps {
  disabled?: boolean;
  popoverProps?: PopoverProps | any;
  maxDate?: Date;
  minDate?: Date;
  setDateSelected: (date: IDateRangePicker3) => void;
  dateSelected: IDateRangePicker3 | null;
}

export interface IDateRangePicker3 {
  endDate: Date | undefined;
  startDate: Date | undefined;
}

const DateRangePickerCustom = ({
  disabled = false,
  popoverProps,
  minDate,
  maxDate,
  setDateSelected,
  dateSelected,
}: DateRangePickerCustomProps) => {
  const [animation, setAnimation] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [date, setDate] = useState<any>([
    {
      startDate: startOfDay(new Date()),
      endDate: endOfDay(new Date()),
      key: 'selection',
    },
  ]);

  const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
    startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),

    startOfYear: startOfYear(new Date()),
    endOfYear: endOfYear(new Date()),
    startOfLastYear: startOfYear(addYears(new Date(), -1)),
    endOfLastYear: endOfYear(addYears(new Date(), -1)),
  };

  const staticRanges: StaticRange[] = [
    {
      label: '7 ngày trước',
      range: () => ({
        startDate: defineds.startOfLastSevenDay,
        endDate: defineds.endOfToday,
      }),
      isSelected: (range) => range?.key === 'selected',
    },
    {
      label: '30 ngày trước',
      range: () => ({
        startDate: defineds.startOfLastThirtyDay,
        endDate: defineds.endOfToday,
      }),
      isSelected: (range) => range?.key === 'selected',
    },

    {
      label: 'Tháng này',
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: defineds.endOfMonth,
      }),
      isSelected: (range) => range?.key === 'selected',
    },
    {
      label: 'Tháng trước',
      range: () => ({
        startDate: defineds.startOfLastMonth,
        endDate: defineds.endOfLastMonth,
      }),
      isSelected: (range) => range?.key === 'selected',
    },
    {
      label: 'Năm này',
      range: () => ({
        startDate: defineds.startOfYear,
        endDate: defineds.endOfYear,
      }),
      isSelected: (range) => range?.key === 'selected',
    },
    {
      label: 'Năm trước',
      range: () => ({
        startDate: defineds.startOfLastYear,
        endDate: defineds.endOfLastYear,
      }),
      isSelected: (range) => range?.key === 'selected',
    },
  ];

  const handlePopoverClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleChangeDate = (rangesByKey: RangeKeyDict, key: string) => {
    const { endDate, startDate } = rangesByKey.selection;
    setDate([rangesByKey.selection]);
    setDateSelected({ endDate, startDate });

    if (
      dayjs(startDate).format(FORMAT_DD_MM_YYYY) !==
      dayjs(endDate).format(FORMAT_DD_MM_YYYY)
    ) {
      setAnimation(true);
      if (key !== 'DEFINED_RANGE') {
        setAnchorEl(null);
      }
    }
  };

  const debounceHandleChangeDate = useCallback(
    debounce((rangesByKey: RangeKeyDict, key: string) => {
      handleChangeDate(rangesByKey, key);
    }, 500),
    []
  );

  const debounceAnimation = useCallback(
    debounce(() => {
      setAnimation(false);
    }, 50),
    []
  );

  useEffect(() => {
    if (animation === true) {
      debounceAnimation();
    }
  }, [animation]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontSize: '12px',
        width: '100%',
      }}
    >
      <OutlinedInputWrapper
        className="input6"
        sx={{
          border: anchorEl
            ? '1px solid #FFC20E'
            : '1px solid rgba(0, 0, 0, 0.23)',
        }}
      >
        <OutlinedInputContainerStyled className="container37">
          <OutlinedInputLabelStyled
            className="ngy-c-phn"
            sx={{
              color: anchorEl ? '#FFC20E' : '#6E6B7B',
            }}
          >
            Ngày được phân công
          </OutlinedInputLabelStyled>
        </OutlinedInputContainerStyled>
        <OutlinedInputStyled className="inactive">
          <Stack
            flex={1}
            flexDirection="row"
            alignItems="center"
            gap="4px"
            width="100%"
          >
            <Box
              sx={{
                flex: 1,
                position: 'relative',
                letterSpacing: '0.15px',
                lineHeight: '150%',
              }}
            >
              <FormControl onClick={handlePopoverClick}>
                <TextField
                  variant="standard"
                  className={animation ? 'lineUp' : ''}
                  value={
                    dayjs(dateSelected?.startDate).format(FORMAT_DD_MM_YYYY) ??
                    ''
                  }
                  InputProps={{
                    disableUnderline: true, // <== added this
                  }}
                  sx={{
                    '.MuiInputBase-input': {
                      padding: '7px 0 5px;',
                    },
                  }}
                  placeholder="Từ ngày"
                />
              </FormControl>
            </Box>
            <Image
              className="close-icon"
              src="/images/icon/adornment-end.png"
            />
            <Box
              sx={{
                flex: 1,
                position: 'relative',
                letterSpacing: '0.15px',
                lineHeight: '150%',
              }}
            >
              <FormControl onClick={handlePopoverClick}>
                <TextField
                  variant="standard"
                  className={animation ? 'lineUp' : ''}
                  InputProps={{
                    disableUnderline: true, // <== added this
                  }}
                  value={
                    dayjs(dateSelected?.endDate).format(FORMAT_DD_MM_YYYY) ?? ''
                  }
                  sx={{
                    '.MuiInputBase-input': {
                      padding: '7px 0 5px;',
                    },
                  }}
                  placeholder="Đến ngày"
                />
              </FormControl>
            </Box>
          </Stack>
          <Image
            className="close-icon"
            src="/images/icon/Union.png"
            style={{ cursor: 'pointer' }}
            onClick={handlePopoverClick}
          />
        </OutlinedInputStyled>
      </OutlinedInputWrapper>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ marginTop: '16px' }}
        {...popoverProps}
      >
        <Box display="flex">
          <div>
            <DefinedRange
              ranges={date}
              staticRanges={staticRanges}
              onChange={(rangesByKey) =>
                debounceHandleChangeDate(rangesByKey, 'DEFINED_RANGE')
              }
              inputRanges={[]}
            />
          </div>
          <DateRangeStyled
            dateDisplayFormat="dd/MM/yyyy"
            onChange={(rangesByKey) =>
              debounceHandleChangeDate(rangesByKey, 'DATE_RANGE')
            }
            rangeColors={['#FFC20E']}
            months={1}
            ranges={date}
            direction="vertical"
            locale={vi}
            showDateDisplay={false}
            minDate={minDate}
            maxDate={maxDate}
            fixedHeight
          />
        </Box>
      </Popover>
    </div>
  );
};

export default DateRangePickerCustom;
