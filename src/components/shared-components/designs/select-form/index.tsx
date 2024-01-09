import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectChangeEvent,
  SelectProps,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface IInputFormProps extends SelectProps {
  name: string;
  control?: Control<any>;
  errorMessage?: string;
  label: string;
  required?: boolean;
  sx?: SxProps<Theme>;
  placeholder?: string;
  children: React.ReactNode;
  defaultValue?: any;
  optionSelected?: any;
  formTarget?: string;
  onChangeSelect?: (
    event: SelectChangeEvent<any>,
    child: React.ReactNode
  ) => void;
}

const SelectMUI: React.FC<IInputFormProps> = (props) => {
  // props
  const {
    control,
    name,
    errorMessage,
    label,
    required,
    sx,
    children,
    defaultValue,
    placeholder,
    onChangeSelect,
    optionSelected,
    formTarget = 'id',
    ...reset
  } = props;
  const theme = useTheme();
  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id={name} error={!!errorMessage}>
        {required ? (
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
        )}
      </InputLabel>
      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={{ required }}
          render={({ field: { onChange, value } }) => (
            <Select
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
              labelId={name}
              value={value?.toString() || ''}
              fullWidth
              error={!!errorMessage}
              MenuProps={{
                style: {
                  maxHeight: 300,
                },
              }}
              onChange={(...event) => {
                onChange(...event);
                if (onChangeSelect) {
                  onChangeSelect(...event);
                }
              }}
              placeholder={placeholder}
              {...reset}
            >
              {children}
            </Select>
          )}
        />
      ) : (
        <Select
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
          labelId={name}
          value={optionSelected?.[formTarget]?.toString() || ''}
          fullWidth
          error={!!errorMessage}
          MenuProps={{
            style: {
              maxHeight: 300,
            },
          }}
          onChange={onChangeSelect}
          placeholder={placeholder}
          {...reset}
        >
          {children}
        </Select>
      )}
      {errorMessage && (
        <FormHelperText sx={{ color: 'error.main' }} id="">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectMUI;
