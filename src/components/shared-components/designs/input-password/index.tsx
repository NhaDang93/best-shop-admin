import {
  FormControl,
  FormHelperText,
  IconButton,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

interface IInputPasswordProps {
  name: string;
  control: Control<any>;
  errorMessage?: string;
  label: string;
  required?: boolean;
  sx?: SxProps<Theme>;
  placeholder?: string;
}

const InputPassword: React.FC<IInputPasswordProps> = (props) => {
  const {
    control,
    name,
    errorMessage,
    label,
    required,
    sx,
    placeholder = 'Nhập',
  } = props;
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth sx={sx}>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Stack position="relative">
            <TextField
              value={value}
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
              autoComplete="off"
              placeholder={placeholder}
              error={Boolean(errorMessage!)}
              type={showPassword ? 'text' : 'password'}
            />
            <IconButton
              sx={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              edge="end"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOutline /> : <EyeOffOutline />}
            </IconButton>
          </Stack>
        )}
      />
      {Boolean(errorMessage!) && (
        <FormHelperText sx={{ color: 'error.main' }} id="">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};
export default InputPassword;
