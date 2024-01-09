import { FormControl, MenuItem, Select, styled } from '@mui/material';

interface ICustomSelect {
  value: string;
  setValue: (value: string) => void;
  options: { value: any; name: string }[];
  className?: string;
}

const FormControlStyled = styled(FormControl)(({ theme }) => ({}));

const SelectStyled = styled(Select)(({ theme }) => ({
  height: '40px',
  width: '100%',
  color: '#000',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  letterSpacing: '0.15px',
  opacity: 0.6,
  '&.select-custom': {
    width: '100%',
  },
}));

const CustomSelect = ({
  value,
  setValue,
  options,
  className = '',
}: ICustomSelect) => {
  const handleSelect = (event: any) => {
    setValue(event.target.value as string);
  };
  return (
    <SelectStyled
      labelId="select-premier"
      id="simple-select-premier"
      value={value}
      onChange={handleSelect}
      className={className}
    >
      {options?.map((_option) => {
        return (
          <MenuItem key={_option?.value} value={_option?.value}>
            {_option?.name}
          </MenuItem>
        );
      })}
    </SelectStyled>
  );
};

export default CustomSelect;
