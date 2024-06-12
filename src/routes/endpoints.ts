import { HTTP_METHOD } from 'next/dist/server/web/http';

const p = (method: HTTP_METHOD, url: string) => ({ method, url });

export const endpoints = {
  admin: {
    list: p('GET', '/manage/admins'),
    create: p('POST', '/manage/admin'),
    edit: (id: string) => p(`PUT`, `/manage/admin/${id}`),
    block: (id: string) => p(`POST`, `/manage/admin/${id}/block`),
    action: (id: string) => p(`PUT`, `/manage/admin/${id}/role`),
    actions: p('GET', `/manage/actions`),
  },
  riskprofile: {
    list: p('GET', '/cms/rps'),
    create: p('POST', '/cms/rps'),
    edit: (id: string) => p('POST', `/cms/rps`),
  },
  universe: {
    vas: {
      list: p('GET', '/vas'),
      editTab: (id: string) => p('PUT', `/vas?id=${id}`),
      lendingSolutions: {
        editDescription: p('PUT', `/vas/lending_solutions/items`),
        addDescription: p('POST', `/vas/lending_solutions/items`),
        editHeading: (id: string) => p('PUT', `/vas/lending_solutions/items/heading?id=${id}`),
      },
      wills: {
        editDescription: p('PUT', `/vas/wills/items`),
        editHeading: (id: string) => p('PUT', `/vas/wills/items/heading?id=${id}`),
      },
    },
  },
  notifications: {
    updateAPP: p('PUT', '/versions/update'),
    list: p('GET', '/notifications'),
    create: p('POST', '/notifications/create'),
    edit: p('PUT', `/notifications/update`),
    activeList: p('GET', '/notifications/active'),
  },
  productUpload: {
    excelUpload: {
      upload: (type: string) => p('POST', `/${type}/upload/all`),
      download: (type: string) => p('GET', `/${type}/download/all`),
    },
  },
  contentManagement: {
    research: {
      list: p('GET', '/path/content/research'),
      updateTab: p('PUT', `/path/content/research/tab`),
      updatePage: (id: string) => p('PUT', `/path/content/research/page/${id}`),
      addCard: p('POST', `path/content/research/card`),
      updateCard: (id: string) => p('PUT', `path/content/research/card/${id}`),
      deleteCard: (id: string) => p('DELETE', `path/content/research/card/${id}`),
    },
  },
  users: {
    list: p('GET', '/users'),
    edit: p('PUT', `/users/flags`),
  },
  deal: {
    list: p('GET', '/api/deal'),
    create: p('POST', '/api/deal/basic'),
    edit: (id: string) => p(`POST`, `/api/deal/basic/${id}`),
    media: (id: string) => p(`POST`, `/api/deal/${id}/basic/media`),
    trending: p('POST', '/api/deal/trending'),
    stage: (id: string) => p('POST', `/api/deal/stage/${id}`),
    status: (id: string) => p('POST', `/api/deal/${id}/status`),
    assignDM: (id: string) => p('POST', `/api/deal/manager/${id}`),
    dealOfTheWeek: (id: string) => p('POST', `/api/deal/deal-of-the-week/${id}`),
    pitch: (id: string) => p(`POST`, `/api/deal/${id}/pitch`),
    highlights: (id: string) => p(`POST`, `/api/deal/${id}/pitch/highlights`),
    companyInfo: (id: string) => p(`POST`, `/api/deal/${id}/company-info`),
    addTeam: (id: string) => p(`POST`, `/api/deal/${id}/company-info/team`),
    editTeam: (id: string, mem_id: string) =>
      p(`PUT`, `/api/deal/${id}/company-info/team/${mem_id}`),
    deleteTeam: (id: string) => p(`DELETE`, `/api/deal/${id}/company-info/team`),
    addInvestor: (id: string) => p(`POST`, `/api/deal/${id}/company-info/current-investor`),
    editInvestor: (id: string, mem_id: string) =>
      p(`PUT`, `/api/deal/${id}/company-info/current-investor/${mem_id}`),
    deleteInvestor: (id: string) => p(`DELETE`, `/api/deal/${id}/company-info/current-investor`),
    addNews: (id: string) => p(`POST`, `/api/deal/${id}/company-info/news`),
    editNews: (id: string, mem_id: string) =>
      p(`PUT`, `/api/deal/${id}/company-info/news/${mem_id}`),
    deleteNews: (id: string) => p(`DELETE`, `/api/deal/${id}/company-info/news`),
    dealTerms: (id: string) => p(`POST`, `/api/deal/${id}/terms`),
    dataroom: (id: string) => p(`POST`, `/api/deal/${id}/dataroom`),
    saveInvested: (dealId: string) => p(`POST`, `/api/deal/${dealId}/invest`),
    ddReport: (dealId: string) => p(`POST`, `/api/deal/${dealId}/dd-report`),
  },
  role: {
    list: p('GET', '/manage/roles'),
    create: p('POST', '/manage/role'),
    edit: (id: string) => p(`PUT`, `/manage/role/${id}`),
    allPermissions: p('GET', '/manage/modules'),
    permissions: (id: string) => p('GET', `/manage/policies/${id}`),
  },
  bonds: {
    list: p('GET', '/bonds'),
    create: p('POST', '/bonds'),
    edit: (id: string) => p(`PUT`, `/bonds/${id}`),
    editAMC: (id: string) => p(`PUT`, `/bonds/amc/${id}`),
  },
  mlds: {
    list: p('GET', '/mlds'),
    create: p('POST', '/mlds'),
    edit: (id: string) => p(`PUT`, `/cms/mlds/${id}`),
    editAMC: (id: string) => p(`PUT`, `/mlds/amc/${id}`),
  },
  company: {
    list: p('GET', '/api/company'),
    create: p('POST', '/api/company'),
    edit: (id: string) => p(`PUT`, `/api/company/${id}`),
  },
  investors: {
    list: p('GET', '/api/investor'),
    assignRM: p('POST', '/api/investor/rm'),
  },
  portfolio: {
    list: p('GET', '/api/portfolio'),
    transactions: p('GET', '/api/portfolio/txn'),
  },
  constant: p('GET', '/constant'),
  carousel: {
    list: p('GET', '/cms/carousels'),
    insert: p('POST', '/cms/carousel'),
    edit: (id: string) => p(`PUT`, `/cms/carousels/${id}`),
  },
};
