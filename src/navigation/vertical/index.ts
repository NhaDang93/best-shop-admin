// ** Type import
import { NavLink, VerticalNavItemsType } from '@/layouts/types';
import { GridViewOutlined } from '@mui/icons-material';

const navigation = (): VerticalNavItemsType => [
  {
    title: 'home',
    icon: GridViewOutlined as unknown as NavLink['icon'],
    path: '/',
  },
  {
    title: 'Layout NFT',
    icon: GridViewOutlined as unknown as NavLink['icon'],
    path: '/layout-nft',
  },
];

export default navigation;
