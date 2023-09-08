import { HTTP_METHOD } from 'next/dist/server/web/http';

const p = (method: HTTP_METHOD, url: string) => ({ method, url });

export const endpoints = {
  admin: {
    list: p('GET', '/api/admin'),
    create: p('POST', '/api/admin'),
    edit: (id: string) => p(`PUT`, `/api/admin/${id}`),
    block: p(`PUT`, `/api/admin/block`),
  },
  deal: {
    list: p('GET', '/api/deal'),
    create: p('POST', '/api/deal/basic'),
    edit: (id: string) => p(`PUT`, `/api/deal/basic/${id}`),
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
  },
  role: {
    list: p('GET', '/api/admin/role'),
    create: p('POST', '/api/admin/role'),
    edit: (id: string) => p(`PUT`, `/api/admin/role/${id}`),
    permissions: p('GET', '/api/admin/role/permission'),
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
  constant: p('GET', '/constant'),
};
