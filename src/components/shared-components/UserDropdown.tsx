import { Avatar } from '@mui/material';
import Badge from '@mui/material/Badge';

const UserDropdown = () => {
  return (
    <Badge
      overlap="circular"
      sx={{ cursor: 'pointer', marginRight: (theme) => theme.spacing(6) }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar
        alt="John Doe"
        sx={{ width: 32, height: 32 }}
        src="/images/avatars/avatar.png"
      />
    </Badge>
  );
};

export default UserDropdown;
