// ** MUI Imports
import { Theme } from '@mui/material/styles'

const FormControl = (theme: Theme) => ({
  MuiFormLabel: {
    styleOverrides: {
      root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        background: theme.palette.common.white
      },
    },
  },
})

export default FormControl
