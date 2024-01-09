import { Avatar } from '@mui/material';
import Badge from '@mui/material/Badge';

const ShoppingDropDown = () => {
  return (
    <Badge
      overlap="circular"
      sx={{ cursor: 'pointer' }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar
        alt="John Doe"
        sx={{ width: 32, height: 32 }}
        src="/images/icon/shopping-bag.png"
      />
    </Badge>
  );
};

export default ShoppingDropDown;
