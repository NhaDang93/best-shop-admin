import _, { debounce } from 'lodash';

import React, { Ref, useCallback, useEffect, useState } from 'react';

import { Control, Controller } from 'react-hook-form';

// * libs
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  CircularProgress,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

// * typings

export interface IOptions {
  [key: string]: any;
}
export interface IAutoCompleteProps<T = any> {
  onFetchAPI: (value: string, params?: T) => Promise<T[]>;
  optionsDefault?: IOptions[];
  value?: IOptions;
  control?: Control<any>;
  noOptionsText?: React.ReactNode;
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectedValue?: (option: IOptions) => void;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IOptions,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  renderInput?: (option: AutocompleteRenderInputParams) => React.ReactNode;
  placeholder?: string;
  label: string;
  name?: string;
  errorMessage?: string;
  required?: boolean;
  displayTarget?: string;
  formTarget?: string;
  disable?: boolean;
  renderTags?: (value: T[]) => React.ReactNode;
  ref?: Ref<any>;
  focused?: boolean;
  typeInput?: string;
  paramsSearch?: {
    [key: string]: any;
  };
}

const AutoCompleteAsync: React.FC<IAutoCompleteProps> = (props) => {
  // * Props
  const {
    onFetchAPI,
    optionsDefault = [],
    control,
    onSelectedValue,
    onSearch,
    renderOption,
    label = 'Chọn',
    placeholder = 'Nhập để tìm',
    name = '',
    errorMessage,
    required,
    value: defaultValue = '',
    noOptionsText = 'Không có dữ liệu',
    displayTarget = 'name',
    formTarget = 'id',
    disable = false,
    renderTags,
    ref,
    focused = false,
    typeInput = 'text',
    paramsSearch,
    renderInput,
  } = props;
  // * States
  const [listResult, setListResult] = useState<any[] | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setListResult(optionsDefault);
  }, [optionsDefault]);
  const handleFetchAPI = async (key: string, params?: any) => {
    setLoading(true);
    const response = await onFetchAPI(key, params);
    if (!_.isEmpty(response)) {
      setListResult(response);
    } else {
      setListResult([]);
    }
    setLoading(false);
  };

  const debounceSearch = useCallback(
    debounce((value: string, params?: any) => {
      handleFetchAPI(value, params);
    }, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event);
    }
    const { value } = event.target;
    debounceSearch(value, paramsSearch);
  };

  const handleFocus = () => {
    setListResult(optionsDefault);
  };

  return (
    <FormControl fullWidth>
      {control ? (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange } }) => (
            <Autocomplete
              id="autocomplete-user"
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => {
                setOpen(false);
                setListResult(optionsDefault);
              }}
              onFocus={handleFocus}
              loading={loading}
              options={listResult === null ? optionsDefault : listResult ?? []}
              disabled={disable}
              value={defaultValue}
              renderOption={renderOption}
              filterOptions={(x) => x}
              noOptionsText={noOptionsText}
              getOptionLabel={(option: IOptions) => {
                return option ? option?.[displayTarget] : '';
              }}
              onChange={(event, value: IOptions) => {
                onChange(value?.[formTarget]);
                if (onSelectedValue) {
                  onSelectedValue((value as IOptions) || null);
                }
              }}
              renderTags={renderTags}
              renderInput={(params: any) =>
                renderInput ? (
                  renderInput(params)
                ) : (
                  <TextField
                    variant="filled"
                    {...params}
                    ref={ref}
                    focused={focused}
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
                    onChange={handleSearch}
                    error={!!errorMessage}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                    type={typeInput}
                  />
                )
              }
            />
          )}
        />
      ) : (
        <Autocomplete
          id="autocomplete-user"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => {
            setOpen(false);
            setListResult(optionsDefault);
          }}
          value={defaultValue}
          loading={loading}
          disabled={disable}
          options={listResult === null ? optionsDefault : listResult ?? []}
          noOptionsText={noOptionsText}
          filterOptions={(x) => x}
          getOptionLabel={(option: any) => {
            return option ? option?.[displayTarget] : '';
          }}
          onChange={(event, value) => {
            if (onSelectedValue) {
              onSelectedValue(value as IOptions);
            }
          }}
          renderTags={renderTags}
          renderOption={renderOption}
          renderInput={(params: any) =>
            renderInput ? (
              renderInput(params)
            ) : (
              <TextField
                {...params}
                label={label}
                ref={ref}
                focused={focused}
                placeholder={placeholder}
                onChange={handleSearch}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )
          }
        />
      )}
      {!!errorMessage && (
        <FormHelperText sx={{ color: 'error.main' }} id="">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AutoCompleteAsync;
