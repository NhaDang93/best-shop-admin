import React from 'react';

import { Control, Controller } from 'react-hook-form';

import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderOptionState,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

export interface IOptions {
  [key: string]: any;
}
interface IAutoCompleteCustomProps<T = any>
  extends Omit<
    AutocompleteProps<
      any,
      boolean | undefined,
      boolean | undefined,
      boolean | undefined
    >,
    'renderInput'
  > {
  options: IOptions[];
  optionDefault?: IOptions;
  control?: Control<any>;
  onSelectedValue?: (option: IOptions | null) => void;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IOptions,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  placeholder?: string;
  label: string;
  name: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  displayTarget?: string;
  formTarget?: string;
}

const AutoComplete: React.FC<IAutoCompleteCustomProps> = (props) => {
  const {
    options,
    optionDefault,
    control,
    onSelectedValue,
    renderOption,
    label,
    placeholder,
    name,
    errorMessage,
    required,
    disabled,
    displayTarget = 'name',
    formTarget = 'id',
    ...res
  } = props;
  const theme = useTheme();

  return (
    <FormControl fullWidth size="medium">
      {control ? (
        <Controller
          control={control}
          name={name}
          render={({ field: { onBlur, onChange, value } }) => {
            return (
              <Autocomplete
                {...res}
                disabled={disabled}
                value={optionDefault}
                noOptionsText="Không có dữ liệu"
                onChange={(event, newValue: IOptions) => {
                  onChange(newValue?.[formTarget]);

                  if (onSelectedValue) {
                    onSelectedValue?.(newValue);
                  }
                }}
                getOptionLabel={(option: IOptions) => {
                  return option ? option?.[displayTarget] : '';
                }}
                onBlur={onBlur}
                options={options}
                ListboxProps={{
                  style: {
                    maxHeight: 250,
                  },
                }}
                renderOption={renderOption}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    error={Boolean(errorMessage)}
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
                    placeholder={placeholder}
                    autoComplete="off"
                  />
                )}
              />
            );
          }}
        />
      ) : (
        <Autocomplete
          {...res}
          disabled={disabled}
          value={optionDefault}
          getOptionLabel={(option: IOptions) => {
            return option ? option?.[displayTarget] : '';
          }}
          renderOption={renderOption}
          noOptionsText="Không có dữ liệu"
          onChange={(event, newValue: IOptions | null) => {
            onSelectedValue?.(newValue);
          }}
          options={options}
          ListboxProps={{
            style: {
              maxHeight: 250,
            },
          }}
          renderInput={(params: any) => (
            <TextField
              {...params}
              error={Boolean(errorMessage)}
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
              placeholder={placeholder}
              autoComplete="off"
            />
          )}
        />
      )}
      {Boolean(errorMessage!) && (
        <FormHelperText sx={{ color: 'error.main' }} id="">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AutoComplete;
