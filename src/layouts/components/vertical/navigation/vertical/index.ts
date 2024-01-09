// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline';
import ShieldOutline from 'mdi-material-ui/ShieldOutline';

// ** Type import
import { VerticalNavItemsType } from 'src/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: HomeOutline as any,
      badgeContent: 'new',
      badgeColor: 'error',
      action: 'read',
      subject: 'acl-page',
    },

    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      icon: ShieldOutline as any,
      title: 'Access Control',
    },
  ];
};

export default navigation;
