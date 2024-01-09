import {
  addDays,
  addMonths,
  addYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';

import { vi } from 'date-fns/locale';

import React, { ReactElement, useEffect, useRef, useState } from 'react';

import {
  DateRange,
  DefinedRange,
  RangeKeyDict,
  StaticRange,
} from 'react-date-range';
import { UseFormRegister } from 'react-hook-form';

import Reload from 'mdi-material-ui/Reload';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  Popover,
  PopoverProps,
  TextField,
  styled,
} from '@mui/material';

// * style module
import { DateRangeContainer } from './styled';

const DateRangerWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  '&.date-range': {
    width: '100%',
    '.MuiInputBase-input': {
      padding: '4px 14px',
      height: '32px',
    },
  },
}));
export interface IDateRangePicker3 {
  endDate: Date | undefined;
  startDate: Date | undefined;
}

interface IDateRangPicker3Props {
  initStartDate: Date | null;
  initEndDate: Date | null;
  onChangeDate: (date: IDateRangePicker3 | null) => void;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  register?: UseFormRegister<any>;
  label?: string;
  placeholderStart?: string;
  className?: string;
  maxDate?: Date;
  minDate?: Date;
  name?: string;
  autoSelectSearch?: boolean;
  allowReset?: boolean;
  popoverHeader?: () => ReactElement;
  popoverProps?: PopoverProps | any;
}
export interface IValueDateRangePicker3 {
  start: string;
  end: string;
}

export const isValidDate = (d: Date) => {
  return d instanceof Date && !Number.isNaN(d.getTime());
};

export const formatDateToDisplay = (date: string): string => {
  if (!date || !isValidDate(new Date(date))) return '--';
  return date ? format(new Date(date), 'dd/MM/yyyy') : '';
};

const DateRangPicker3: React.FC<IDateRangPicker3Props> = (props) => {
  const countRef = useRef(0);
  const inputRef = React.createRef();
  const {
    initStartDate,
    initEndDate,
    onChangeDate,
    popoverHeader,
    popoverProps,
    required,
    disabled,
    errorMessage,
    autoSelectSearch = false,
    placeholderStart = 'dd/mm/yyyy',
    className,
    maxDate,
    minDate,
    name,
    label = 'Thời gian',
    allowReset = true,
  } = props;
  const [value, setValue] = useState<IValueDateRangePicker3 | null>(null);
  const [dateSelected, setDateSelected] = useState<IDateRangePicker3 | null>(
    null
  );
  const [date, setDate] = useState<any>([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
    if (autoSelectSearch) {
      if (key === 'DATE_RANGE') {
        countRef.current += 1;
        if (countRef.current === 2) {
          handlePopoverClose();
        }
      }
      if (key === 'DEFINED_RANGE') {
        handlePopoverClose();
      }
    }
  };

  const resetDate = (e: any) => {
    e.stopPropagation();
    onChangeDate(null);
    setDateSelected(null);
    setValue({
      end: '',
      start: '',
    });
  };

  const handleConfirm = () => {
    if (dateSelected) {
      onChangeDate({
        startDate: dateSelected?.startDate,
        endDate: dateSelected?.endDate,
      });
    }
    setValue({
      end: dateSelected?.endDate
        ? formatDateToDisplay(dateSelected?.endDate?.toString())
        : '',
      start: dateSelected?.startDate
        ? formatDateToDisplay(dateSelected?.startDate?.toString())
        : '',
    });
    handlePopoverClose();
  };

  const handleCancel = () => {
    handlePopoverClose();
  };

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
      label: 'Hôm qua',
      range: () => ({
        startDate: defineds.startOfYesterday,
        endDate: defineds.endOfYesterday,
      }),
      isSelected: (range) => range?.key === 'selected',
    },
    {
      label: 'Hôm nay',
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday,
      }),
      isSelected: (range) => range?.key === 'selected',
    },
    {
      label: '7 ngày trước',
      range: () => ({
        startDate: defineds.startOfLastSevenDay,
        endDate: defineds.endOfToday,
      }),
      isSelected: (range: any) => range?.key === 'selected',
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
      isSelected: (range: any) => range?.key === 'selected',
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
      isSelected: (range: any) => range?.key === 'selected',
    },
  ];

  const dateValue =
    value?.end && value?.start ? `${value?.start} - ${value?.end}` : '';

  useEffect(() => {
    setDate([{ ...date[0], endDate: initEndDate, startDate: initStartDate }]);
    setValue({
      end: initEndDate ? formatDateToDisplay(initEndDate?.toString()) : '',
      start: initStartDate
        ? formatDateToDisplay(initStartDate?.toString())
        : '',
    });
  }, [initStartDate, initEndDate]);

  useEffect(() => {
    // khi popover đóng và là autoSelectSearch và startDate & endDate có chọn sẽ gọi onChangeDate
    if (
      !anchorEl &&
      autoSelectSearch &&
      dateSelected?.startDate &&
      dateSelected?.endDate
    ) {
      onChangeDate({
        startDate: dateSelected?.startDate,
        endDate: dateSelected?.endDate,
      });
      setDateSelected(null);
      countRef.current = 0;
    }
  }, [anchorEl]);

  return (
    <DateRangerWrapper className={className}>
      <div>
        <FormControl fullWidth onClick={handlePopoverClick}>
          <TextField
            id="date-range-picker"
            label={label}
            autoComplete="off"
            required={required}
            disabled={disabled}
            error={Boolean(errorMessage)}
            value={dateValue}
            placeholder={placeholderStart}
            inputRef={inputRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {allowReset ? (
                    <Reload onClick={resetDate} sx={{ cursor: `pointer` }} />
                  ) : null}
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        {Boolean(errorMessage) && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {errorMessage}
          </FormHelperText>
        )}
      </div>

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
        {...popoverProps}
      >
        <DateRangeContainer>
          {popoverHeader && popoverHeader()}

          <Box display="flex">
            <div>
              <DefinedRange
                ranges={date}
                staticRanges={staticRanges}
                onChange={(rangesByKey: any) =>
                  handleChangeDate(rangesByKey, 'DEFINED_RANGE')
                }
              />
              {!autoSelectSearch && (
                <div>
                  <Button
                    disabled={!dateSelected}
                    type="button"
                    onClick={handleConfirm}
                    className="w-100"
                    variant="contained"
                    size="small"
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    disabled={value?.start === '' || value?.end === ''}
                    type="button"
                    onClick={handleCancel}
                    variant="outlined"
                    className="mt-md-2 w-100"
                    size="small"
                    fullWidth
                  >
                    Hủy
                  </Button>
                </div>
              )}
            </div>
            <DateRange
              dateDisplayFormat="dd/MM/yyyy"
              onChange={(rangesByKey: any) =>
                handleChangeDate(rangesByKey, 'DATE_RANGE')
              }
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
        </DateRangeContainer>
      </Popover>
    </DateRangerWrapper>
  );
};

export default DateRangPicker3;
