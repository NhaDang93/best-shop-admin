import {
  FormControl,
  FormHelperText,
  StandardTextFieldProps,
  SxProps,
  TextField,
  Theme,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  '.MuiInputBase-root': {
    height: '40px',
    fontSize: '16px',

    '@media (min-width:200px)': {
      height: '30px',
      fontSize: '12px',
    },
    '@media (min-width:400px)': {
      height: '30px',
      fontSize: '12px',
    },
    '@media (min-width:768px)': {
      height: '40px',
      fontSize: '16px',
    },

    '@media (min-width:1024px)': {
      height: '40px',
      fontSize: '16px',
    },
  },
}));

interface IInputFormProps extends StandardTextFieldProps {
  name: string;
  control: Control<any>;
  errorMessage?: string;
  label: string;
  required?: boolean;
  type?: string;
  sx?: SxProps<Theme>;
  placeholder?: string;
  disabled?: boolean;
  onChangeValue?: (value: string) => void;
}

const InputForm: React.FC<IInputFormProps> = (props) => {
  const {
    control,
    name,
    errorMessage,
    label,
    required,
    type = 'text',
    sx,
    disabled,
    placeholder = 'Nhập',
    onChangeValue,
    ...rest
  } = props;
  const theme = useTheme();

  const handleOnlyNumber = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (type === 'number') {
      if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
        event.preventDefault();
      }
    }
  };
  return (
    <FormControl fullWidth sx={sx}>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextFieldStyled
            autoComplete="off"
            disabled={disabled}
            value={value || ''}
            onBlur={onBlur}
            label={
              required ? (
                <span>
                  {label}{' '}
                  <Typography
                    sx={{ color: theme.palette.error.main }}
                    component="span"
                  >
                    *
                  </Typography>
                </span>
              ) : (
                label
              )
            }
            onKeyPress={handleOnlyNumber}
            onChange={(event) => {
              onChange(event);
              const { value: valueInput } = event.target;
              onChangeValue?.(valueInput);
            }}
            placeholder={placeholder}
            error={Boolean(errorMessage!)}
            type={type}
            {...rest}
          />
        )}
      />
      {Boolean(errorMessage) && (
        <FormHelperText sx={{ color: 'error.main' }} id="">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};
export default InputForm;
