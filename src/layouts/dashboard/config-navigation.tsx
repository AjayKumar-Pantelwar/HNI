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

const ICONS = {
  deals: icon('ph:handshake-fill', true),
  roles: icon('fluent-mdl2:permissions-solid', true),
  admin: icon('ic_user'),
  company: icon('ic_banking'),
  dashboard: icon('ic_dashboard'),
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
            icon: ICONS.admin,
            children: [
              { title: t('list'), path: paths.dashboard.admin.list },
              { title: t('create'), path: paths.dashboard.admin.new },
            ],
          },
          {
            title: t('Roles'),
            path: paths.dashboard.roles.root,
            icon: ICONS.roles,
            children: [
              { title: t('list'), path: paths.dashboard.roles.list },
              { title: t('create'), path: paths.dashboard.roles.new },
            ],
          },
          {
            title: t('Deals'),
            path: paths.dashboard.deals.root,
            icon: ICONS.deals,
            children: [
              { title: t('list'), path: paths.dashboard.deals.list },
              { title: t('create'), path: paths.dashboard.deals.new },
            ],
          },
          {
            title: t('Company'),
            path: paths.dashboard.company.root,
            icon: ICONS.company,
            children: [
              { title: t('list'), path: paths.dashboard.company.list },
              { title: t('create'), path: paths.dashboard.company.new },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
