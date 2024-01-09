import {
  FormControl,
  FormHelperText,
  StandardTextFieldProps,
  SxProps,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface ITextAreaMUIProps extends StandardTextFieldProps {
  name: string;
  control: Control<any>;
  errorMessage?: string;
  label: string;
  required?: boolean;
  sx?: SxProps<Theme>;
  placeholder?: string;
  disabled?: boolean;
  row?: number;
}

const TextAreaMUI: React.FC<ITextAreaMUIProps> = (props) => {
  const {
    control,
    name,
    errorMessage,
    label,
    required,
    sx,
    disabled,
    row = 4,
    placeholder = 'Nhập',
    ...res
  } = props;
  const theme = useTheme();
  return (
    <FormControl fullWidth sx={sx}>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            multiline
            fullWidth
            minRows={row}
            disabled={disabled}
            placeholder={placeholder}
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
            onChange={onChange}
            error={Boolean(errorMessage!)}
            {...res}
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
export default TextAreaMUI;
