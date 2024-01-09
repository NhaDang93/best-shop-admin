import { TextField, TextFieldProps } from '@mui/material';

export type Props = {} & TextFieldProps;
const InputCustom = (props: Props) => {
  return <TextField {...props} />;
};

export default InputCustom;
