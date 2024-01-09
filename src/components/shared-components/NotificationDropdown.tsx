import { Avatar } from '@mui/material';
import Badge from '@mui/material/Badge';

const NotificationDropdown = () => {
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
        alt="notification"
        sx={{ width: 32, height: 32 }}
        src="/images/icon/notification.png"
      />
    </Badge>
  );
};

export default NotificationDropdown;
