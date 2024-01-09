import { Image } from '@/components/shared-components/Image';
import {
  Box,
  FormControl,
  Popover,
  PopoverProps,
  Stack,
  TextField,
  styled,
} from '@mui/material';
import { endOfDay, startOfDay } from 'date-fns';
import { vi } from 'date-fns/locale';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import { FORMAT_DD_MM_YYYY } from '../../../../constants';

const OutlinedInputWrapper = styled('div')(({ theme }) => ({
  alignSelf: 'stretch',
  borderRadius: '4px',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  boxSizing: 'border-box',
  padding: '0 15px',
  height: '50px',
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
  height: '50px',
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

const DatePickerCustom = ({
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
    setDateSelected({ startDate, endDate: startDate });

    if (dayjs(startDate).format(FORMAT_DD_MM_YYYY)) {
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
                      padding: '7px 10px 5px;',
                    },
                  }}
                  placeholder="Từ ngày"
                />
              </FormControl>
            </Box>
            <Image
              style={{
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                opacity: '0.7',
              }}
              src="/images/icon/union.png"
              onClick={handlePopoverClick}
            />
          </Stack>
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

export default DatePickerCustom;
