import NotificationDropdown from '@/components/shared-components/NotificationDropdown';
import ShoppingDropDown from '@/components/shared-components/ShoppingDropdown';
import UserDropdown from '@/components/shared-components/UserDropdown';
import InputCustom from '@/components/shared-components/custom/InputCustom';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button } from '@mui/material';

interface Props {
  hidden: boolean;
}

const AppBarContent = ({ hidden = false }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        margin: '10px 15px',
      }}
    >
      <Box className="actions-left" sx={{ maxWidth: '894px', width: '100%' }}>
        <InputCustom
          placeholder="Search"
          sx={{
            '.MuiButton-root': {
              minWidth: (theme) => `${theme.spacing(8)}`,
            },
            '.MuiInputBase-input': {
              padding: (theme) =>
                `${theme.spacing(3.125)} ${theme.spacing(3.5)}`,
            },
            backgroundColor: '#E6E6E6',
          }}
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: (
              <Button
                sx={{
                  backgroundColor: '#BDBDBD',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  color: (theme) => theme.palette.common.black,
                  ':hover': {
                    backgroundColor: '#BDBDBD',
                  },
                }}
              >
                /
              </Button>
            ),
          }}
          fullWidth
        />
      </Box>
      <Box
        className="actions-right"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <NotificationDropdown />
        <UserDropdown />
        <ShoppingDropDown />
      </Box>
    </Box>
  );
};

export default AppBarContent;
