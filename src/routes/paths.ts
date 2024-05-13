const ROOTS = {
  AUTH: '/authentication',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

export const paths = {
  auth: {
    login: `${ROOTS.AUTH}/login`,
    changePassword: `${ROOTS.AUTH}/change-password`,
    activateTotp: `${ROOTS.AUTH}/activate-totp`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    carousel: {
      root: `${ROOTS.DASHBOARD}/carousel`,
      list: `${ROOTS.DASHBOARD}/carousel/list`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/carousel/${id}/edit`,
      new: `${ROOTS.DASHBOARD}/carousel/new`,
    },
    contentManagement: {
      root: `${ROOTS.DASHBOARD}/content-management`,
      riskProfile: {
        list: `${ROOTS.DASHBOARD}/content-management/risk-profile/list`,
        edit: (id: string) => `${ROOTS.DASHBOARD}/content-management/risk-profile/${id}/edit`,
        new: `${ROOTS.DASHBOARD}/content-management/risk-profile/new`,
      },
      reasearch: {
        list: `${ROOTS.DASHBOARD}/content-management/research/list`,
      },
    },
    actions: {
      root: `${ROOTS.DASHBOARD}/actions`,
      list: `${ROOTS.DASHBOARD}/actions/list`,
    },
    notifications: {
      root: `${ROOTS.DASHBOARD}/notifications`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      list: `${ROOTS.DASHBOARD}/user/list`,
    },
    bonds: {
      root: `${ROOTS.DASHBOARD}/bonds`,
      new: `${ROOTS.DASHBOARD}/bonds/new`,
      list: `${ROOTS.DASHBOARD}/bonds/list`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/bonds/${id}/edit`,
      view: (id: string) => `${ROOTS.DASHBOARD}/bonds/${id}/view`,
    },
    mlds: {
      root: `${ROOTS.DASHBOARD}/mlds`,
      new: `${ROOTS.DASHBOARD}/mlds/new`,
      list: `${ROOTS.DASHBOARD}/mlds/list`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/mlds/${id}/edit`,
      view: (id: string) => `${ROOTS.DASHBOARD}/mlds/${id}/view`,
    },
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
    investors: {
      root: `${ROOTS.DASHBOARD}/investors`,
      list: `${ROOTS.DASHBOARD}/investors/list`,
      profile: (id: string) => `${ROOTS.DASHBOARD}/investors/${id}`,
    },
  },
};
