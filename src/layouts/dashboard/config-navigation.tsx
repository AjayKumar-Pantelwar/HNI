import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { useMemo } from 'react';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import Admin from './icons/admin';
import ContentModification from './icons/content-modification';
import Notifications from './icons/notifications';
import ProductUpload from './icons/product-upload';
import Universe from './icons/universe';
import Users from './icons/users';

const icon = (name: string, isIconify: boolean = false) =>
  isIconify ? (
    <Iconify icon={name} />
  ) : (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );
// https://icon-sets.iconify.design/solar/
// https://www.streamlinehq.com/icons

// const ICONS = {
//   deals: icon('ph:handshake-fill', true),
//   roles: icon('fluent-mdl2:permissions-solid', true),
//   admin: icon('ic_user'),
//   company: icon('ic_banking'),
//   dashboard: icon('ic_dashboard'),
//   investors: icon('tdesign:member', true),
//   actions: icon('material-symbols:history', true),
// };

const MIcons = {
  admin: Admin,
  carousel: ViewCarouselIcon,
  bonds: AccountBalanceIcon,
  mlds: SettingsEthernetIcon,
  investors: PeopleAltIcon,
  user: Users,
  contentManagement: ContentModification,
  notifications: Notifications,
  productUpload: ProductUpload,
  universe: Universe,
};

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      {
        subheader: t(''),
        items: [
          {
            title: t('Admin'),
            path: paths.dashboard.admin.root,
            Icon: MIcons.admin,
            children: [
              { title: t('List'), path: paths.dashboard.admin.list },
              { title: t('Roles'), path: paths.dashboard.roles.list },
              {
                title: t('Logs'),
                path: paths.dashboard.actions.list,
              },
            ].filter(Boolean),
          },
          {
            title: t('Notifications'),
            path: paths.dashboard.notifications.root,
            Icon: MIcons.notifications,
          },
          {
            title: t('Product Upload'),
            path: paths.dashboard.productUpload.root,
            Icon: MIcons.productUpload,
            children: [
              { title: t('Excel'), path: paths.dashboard.productUpload.excelUpload.root },
              { title: t('PDF'), path: paths.dashboard.productUpload.pdfUpload.root },
            ],
          },
          {
            title: t('Bonds'),
            path: paths.dashboard.bonds.root,
            Icon: MIcons.investors,
            children: [
              { title: t('list'), path: paths.dashboard.bonds.list },
              { title: t('create'), path: paths.dashboard.bonds.new },
            ],
          },
          {
            title: t('MLDS'),
            path: paths.dashboard.mlds.root,
            Icon: MIcons.mlds,
            children: [
              { title: t('list'), path: paths.dashboard.mlds.list },
              { title: t('create'), path: paths.dashboard.mlds.new },
            ],
          },

          {
            title: t('Content Management'),
            Icon: MIcons.contentManagement,
            path: paths.dashboard.contentManagement.root,
            children: [
              {
                title: t('Research'),
                path: paths.dashboard.contentManagement.reasearch.list,
              },
              { title: t('Pre Onboarding'), path: paths.dashboard.carousel.list },
              {
                title: t('Risk Profile'),
                path: paths.dashboard.contentManagement.riskProfile.list,
              },
            ],
          },
          {
            title: t('360one Universe'),
            Icon: MIcons.universe,
            path: paths.dashboard.contentManagement.root,
            children: [
              {
                title: t('Value Added Services'),
                path: paths.dashboard.universe.root,
              },
            ],
          },
          {
            title: t('User'),
            path: paths.dashboard.user.root,
            Icon: MIcons.user,
            children: [{ title: t('list'), path: paths.dashboard.user.list }],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
