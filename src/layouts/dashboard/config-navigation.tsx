import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BuildIcon from '@mui/icons-material/Build';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SourceIcon from '@mui/icons-material/Source';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { useMemo } from 'react';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';

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
  deals: MonetizationOnIcon,
  roles: GroupIcon,
  admin: SecurityIcon,
  carousel: ViewCarouselIcon,
  bonds: AccountBalanceIcon,
  mlds: SettingsEthernetIcon,
  actions: BuildIcon,
  investors: PeopleAltIcon,
  user: AccountCircleIcon,
  contentManagement: SourceIcon,
  notifications: NotificationsIcon,
};

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      {
        subheader: t('management'),
        items: [
          {
            title: t('Admin'),
            path: paths.dashboard.admin.root,
            Icon: MIcons.admin,
            children: [
              { title: t('list'), path: paths.dashboard.admin.list },
              { title: t('create'), path: paths.dashboard.admin.new },
            ].filter(Boolean),
          },
          {
            title: t('Roles'),
            path: paths.dashboard.roles.root,
            Icon: MIcons.roles,
            children: [
              { title: t('list'), path: paths.dashboard.roles.list },
              { title: t('create'), path: paths.dashboard.roles.new },
            ],
          },
          {
            title: t('Notifications'),
            path: paths.dashboard.notifications.root,
            Icon: MIcons.notifications,
          },
          {
            title: t('Carousel'),
            path: paths.dashboard.carousel.root,
            Icon: MIcons.carousel,
            children: [
              { title: t('list'), path: paths.dashboard.carousel.list },
              { title: t('create'), path: paths.dashboard.carousel.new },
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
            title: t('Actions'),
            path: paths.dashboard.actions.root,
            Icon: MIcons.actions,
            children: [
              {
                title: t('list'),
                path: paths.dashboard.actions.list,
              },
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
              {
                title: t('Risk Profile'),
                path: paths.dashboard.contentManagement.riskProfile.list,
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
