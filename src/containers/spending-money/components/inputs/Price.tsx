import InputForm from '@/components/shared-components/designs/input-form';
import {
  Slider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { UpdateForm, UpdateFormEnum } from '../modals/AddSpendingMoney';

function valuetext(value: number) {
  return `${value}vnđ`;
}

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 10000000,
    label: '10Triệu',
  },
  {
    value: 20000000,
    label: '20Triệu',
  },
  {
    value: 30000000,
    label: '30Triệu',
  },
  {
    value: 40000000,
    label: '40Triệu',
  },
  {
    value: 50000000,
    label: '50Triệu',
  },
  {
    value: 60000000,
    label: '60Triệu',
  },
  {
    value: 80000000,
    label: '80Triệu',
  },
  {
    value: 100000000,
    label: '100Triệu',
  },
];

const marksMobile = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 30000000,
    label: '30',
  },
  {
    value: 40000000,
    label: '40',
  },
  {
    value: 60000000,
    label: '60',
  },
  {
    value: 100000000,
    label: '100',
  },
];

const PriceInput = ({
  control,
  watch,
  setValue,
  name,
  label,
  placeholder,
  errorMessage,
}: {
  placeholder: string;
  label: string;
  name: UpdateFormEnum;
  control: any;
  watch: UseFormWatch<UpdateForm>;
  setValue: UseFormSetValue<UpdateForm>;
  errorMessage: string;
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [valuePrice, setValuePrice] = useState<number>(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValuePrice(newValue as number);
  };

  const debounceHandleChangeDate = useCallback(
    debounce((event: Event, newValue: number | number[]) => {
      handleChange(event, newValue);
    }, 1),
    []
  );

  const formValue = watch?.(name);

  useEffect(() => {
    if (formValue && parseFloat(formValue) !== valuePrice) {
      setValuePrice(formValue ? parseFloat(formValue) ?? 0 : 0);
    }
  }, [formValue]);

  useEffect(() => {
    if (parseFloat(formValue) !== valuePrice) setValue?.(name, valuePrice ?? 0);
  }, [valuePrice]);

  return (
    <Stack sx={{}}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="end"
      >
        <Stack>
          <Typography>{label}</Typography>
        </Stack>
        <InputForm
          label=""
          control={control}
          name={name}
          placeholder={placeholder}
          sx={{
            maxWidth: '210px',
            borderRadius: '16px',
            '.MuiInputBase-root': {
              color: '#f00020',
              backgroundColor: '#EAEEF2',
            },
          }}
          style={{}}
          errorMessage={errorMessage}
        />
      </Stack>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        step={100000}
        marks={!matches ? marksMobile : marks}
        min={0}
        max={100000000}
        valueLabelDisplay="on"
        sx={{
          width: '97%',
          '&.MuiSlider-root': {
            color: '#FFC20E',
          },
        }}
        value={valuePrice}
        onChange={debounceHandleChangeDate}
      />
    </Stack>
  );
};

export default PriceInput;
