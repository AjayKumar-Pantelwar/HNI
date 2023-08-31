const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

export const paths = {
  auth: {
    login: `${ROOTS.AUTH}/login`,
    changePassword: `${ROOTS.AUTH}/change-password`,
    activateTotp: `${ROOTS.AUTH}/activate-totp`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    admin: {
      root: `${ROOTS.DASHBOARD}/admin`,
      new: `${ROOTS.DASHBOARD}/admin/new`,
      list: `${ROOTS.DASHBOARD}/admin/list`,
      cards: `${ROOTS.DASHBOARD}/admin/cards`,
      account: `${ROOTS.DASHBOARD}/admin/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/admin/${id}/edit`,
      profile: (id: string) => `${ROOTS.DASHBOARD}/admin/${id}/profile`,
    },
    roles: {
      root: `${ROOTS.DASHBOARD}/roles`,
      new: `${ROOTS.DASHBOARD}/roles/new`,
      list: `${ROOTS.DASHBOARD}/roles/list`,
      cards: `${ROOTS.DASHBOARD}/roles/cards`,
      account: `${ROOTS.DASHBOARD}/roles/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/roles/${id}/edit`,
      profile: (id: string) => `${ROOTS.DASHBOARD}/roles/${id}/profile`,
    },
    deals: {
      root: `${ROOTS.DASHBOARD}/deals`,
      list: `${ROOTS.DASHBOARD}/deals/list`,
      new: `${ROOTS.DASHBOARD}/deals/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/deals/${id}/edit`,
      media: (id: string) => `${ROOTS.DASHBOARD}/deals/${id}/media`,
      pitch: (id: string) => `${ROOTS.DASHBOARD}/deals/${id}/pitch`,
      accountInfo: (id: string) => `${ROOTS.DASHBOARD}/deals/${id}/company-info`,
      terms: (id: string) => `${ROOTS.DASHBOARD}/deals/${id}/terms`,
      dataroom: (id: string) => `${ROOTS.DASHBOARD}/deals/${id}/dataroom`,
    },
    company: {
      root: `${ROOTS.DASHBOARD}/company`,
      list: `${ROOTS.DASHBOARD}/company/list`,
      new: `${ROOTS.DASHBOARD}/company/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/company/${id}/edit`,
    },
  },
};
