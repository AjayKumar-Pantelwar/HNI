import { ApiResponse } from '../api.types';

export type GetLandingPageResponse = ApiResponse<LandingPageData>;

export interface LandingPageData {
  path_name: string;
  intro: Intro[];
  lists: List[];
  tabs: Tab[];
  vas: Vas;
}

export interface Intro {
  video_url: string;
  video_thumbnail: string;
  topic: string;
  speaker_name: string;
  designation: string;
  company_name: string;
  company_logo: string;
}

export interface List {
  product_category: string;
  product_count: number;
  product_img: string;
}

export interface Tab {
  label: string;
  tab_id: number;
  items: Items;
}

export interface Items {
  label: string;
  products: ItemsProduct[];
}

export interface ItemsProduct {
  product_name: string;
  product_logo: string;
  product_count: number;
}

export interface Vas {
  label: string;
  products: VasProduct[];
}

export interface VasProduct {
  product_name: string;
  product_label: string;
  product_logo: string;
}

export const mockGetLandingPageResponse: GetLandingPageResponse = {
  status: 'success',
  message: '',
  data: {
    path_name: '360 ONE Universe',
    intro: [
      {
        video_url: 'https://x-phoenix-docket.360.one/app/static/path3/landing.mp4',
        video_thumbnail: 'https://x-phoenix-docket.360.one/app/static/path3/path3_landing_page.png',
        topic: 'Handpicked Investments',
        speaker_name: 'Nikunj Kedia',
        designation: 'Head of 3rd Party Products',
        company_name: '360 ONE',
        company_logo: 'https://x-phoenix-docket.360.one/360one.svg',
      },
    ],
    lists: [
      {
        product_category: 'Exclusives',
        product_count: 5,
        product_img: 'https://x-phoenix-docket.360.one/app/static/path3/exclusives.svg',
      },
      {
        product_category: 'Global Investing',
        product_count: 5,
        product_img: 'https://x-phoenix-docket.360.one/app/static/path3/global_investing.svg',
      },
    ],
    tabs: [
      {
        label: 'All',
        tab_id: 0,
        items: {
          label: 'Products',
          products: [
            {
              product_name: 'Mutual Funds',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/mutual_funds.svg',
              product_count: 10,
            },
            {
              product_name: 'PMS',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/pms.svg',
              product_count: 4,
            },
            {
              product_name: 'AIF',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/aif.svg',
              product_count: 4,
            },
            {
              product_name: 'Angel Investing',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/angel_investor.svg',
              product_count: 4,
            },
          ],
        },
      },
      {
        label: 'Equity',
        tab_id: 1,
        items: {
          label: 'Products',
          products: [
            {
              product_name: 'Mutual Funds',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/mutual_funds.svg',
              product_count: 10,
            },
            {
              product_name: 'PMS',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/pms.svg',
              product_count: 4,
            },
            {
              product_name: 'AIF',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/aif.svg',
              product_count: 4,
            },
          ],
        },
      },
      {
        label: 'Debt',
        tab_id: 2,
        items: {
          label: 'Products',
          products: [
            {
              product_name: 'Mutual Funds',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/mutual_funds.svg',
              product_count: 10,
            },
            {
              product_name: 'AIF',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/aif.svg',
              product_count: 4,
            },
          ],
        },
      },
      {
        label: 'Alternatives',
        tab_id: 3,
        items: {
          label: 'Products',
          products: [
            {
              product_name: 'Mutual Funds',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/mutual_funds.svg',
              product_count: 10,
            },
            {
              product_name: 'AIF',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/aif.svg',
              product_count: 4,
            },
            {
              product_name: 'Angel Investing',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/angel_investor.svg',
              product_count: 4,
            },
          ],
        },
      },
      {
        label: 'Cash Eq.',
        tab_id: 4,
        items: {
          label: 'Products',
          products: [
            {
              product_name: 'Mutual Funds',
              product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/mutual_funds.svg',
              product_count: 10,
            },
          ],
        },
      },
    ],
    vas: {
      label: 'Value added services',
      products: [
        {
          product_name: 'lending_solutions',
          product_label: 'Strategic lending solutions',
          product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/lending_solutions.svg',
        },
        {
          product_name: 'wills_and_succession_planning',
          product_label: 'Wills & Succession planning',
          product_logo:
            'https://x-phoenix-docket.360.one/app/static/path3/wills_and_succession_planning.svg',
        },
        {
          product_name: 'specialized_insurance',
          product_label: 'Specialized Insurance',
          product_logo:
            'https://x-phoenix-docket.360.one/app/static/path3/specialised_insurance.svg',
        },
        {
          product_name: 'immigration_services',
          product_label: 'Immigration Services',
          product_logo:
            'https://x-phoenix-docket.360.one/app/static/path3/immigration_advisory_services.svg',
        },
        {
          product_name: 'accreditation',
          product_label: 'Investor accreditation',
          product_logo: 'https://x-phoenix-docket.360.one/app/static/path3/accreditation.svg',
        },
      ],
    },
  },
};
