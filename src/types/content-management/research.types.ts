export interface GetResearchReponse {
  status: string;
  data: ResearchData[];
}

export interface ResearchData {
  tab_name: string;
  page: ResearchRecord[];
}

export interface ResearchRecord {
  heading: string;
  subheading: string;
  is_downloadable: boolean;
  is_shareable: boolean;
  type: string;
  cards: ResearchCard[];
}

export interface ResearchCard {
  title: string;
  subtitle: string;
  text: string;
  subText1: string;
  subText2: string;
  subText3: string;
  link: string;
  tags: Tag[];
  image: string;
  pdf: string;
  logo: string;
  video: string;
  color: string;
  field1: string;
  field2: string;
  field3: string;
}

export enum SubText1 {
  Empty = '',
  HeadOfAdvisory = 'Head of Advisory',
  SeniorEVP = 'Senior EVP',
}

export interface Tag {
  key: string;
  value: string;
}

export enum Key {
  Empty = '',
  Type = 'type',
}

export enum SubTabs {
  ELEMENT = 'Elements',
  ARTICLES = '360 One Articles',
}

export const mockGetResearchResponse: GetResearchReponse = {
  status: 'success',
  data: [
    {
      tab_name: 'Reports & Publications',
      page: [
        {
          heading: '',
          subheading: '',
          is_downloadable: true,
          is_shareable: true,
          type: 'pdf-tag-list',
          cards: [
            {
              title: 'India Invests Report',
              subtitle: '',
              text: 'A comprehensive report on all the deals in the unlisted equities space.',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [
                {
                  key: 'type',
                  value: 'Private Equity',
                },
                {
                  key: '',
                  value: '',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/ReportsandPublication/1.png',
              pdf: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/WeeklyReport.pdf',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Panorama',
              subtitle: '',
              text: 'Panorama is a meticulously crafted report that offers a comprehensive...',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [
                {
                  key: 'type',
                  value: 'Indian Economy',
                },
                {
                  key: '',
                  value: '',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/ReportsandPublication/3.png',
              pdf: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Panorama.pdf',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Trends & Tides',
              subtitle: '',
              text: 'A topical report on all market trends that directly affect the investor.',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [
                {
                  key: 'type',
                  value: 'CPI',
                },
                {
                  key: '',
                  value: '',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/ReportsandPublication/4.png',
              pdf: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Trends.pdf',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Market Trends',
              subtitle: '',
              text: 'Market Trends captures a comprehensive view of various mark..',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [
                {
                  key: 'type',
                  value: 'Market Trends',
                },
                {
                  key: '',
                  value: '',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/ReportsandPublication/5.png',
              pdf: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Market_Trends.pdf',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
          ],
        },
      ],
    },
    {
      tab_name: 'Thought Leadership',
      page: [
        {
          heading: 'Elemental',
          subheading: '',
          is_downloadable: false,
          is_shareable: false,
          type: 'video-grid',
          cards: [
            {
              title: 'How to effectively set goals for constructing a long...',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/6.png',
              pdf: '',
              logo: '',
              video:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Ep7.mp4',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Financialisation, the credit opportunity in India',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/2.png',
              pdf: '',
              logo: '',
              video:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Ep6.mp4',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Fixed Income in the New Tax Regime',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/1.png',
              pdf: '',
              logo: '',
              video:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Ep5.mp4',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'What does a successful wealth management...',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/4.png',
              pdf: '',
              logo: '',
              video:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Ep4.mp4',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Digitisation in India and its impact on investors',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/5.png',
              pdf: '',
              logo: '',
              video:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Ep3.mp4',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Can you afford to ignore alternates in your..',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/2.png',
              pdf: '',
              logo: '',
              video:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Ep2.mp4',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Constructing a portfolio that lets you sleep...',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: '',
              tags: [],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/3.png',
              pdf: '',
              logo: '',
              video:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Ep1.mp4',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
          ],
        },
        {
          heading: '360 ONE Articles',
          subheading: '',
          is_downloadable: false,
          is_shareable: false,
          type: 'pdf-link-tag',
          cards: [
            {
              title: 'Investors are increasingly investing in the...',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: "https://www.360.one/perspective/thought-leadership/16/Investors-are-increasingly-investing-in-the-PE-and-alternatives-segment:-Yatin-Shah-during-Fortune-India's-Private-Wealth-Roundtable",
              tags: [
                {
                  key: 'type',
                  value: 'Alternatives',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/360_ONE_Articles/6.png',
              pdf: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/WeeklyReport.pdf',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'How to navigate the shifting landscape of we...',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: 'https://www.360.one/perspective/thought-leadership/3/how-to-navigate-shifting',
              tags: [
                {
                  key: 'type',
                  value: 'Wealth Management',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/360_ONE_Articles/7.png',
              pdf: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/WeeklyReport.pdf',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Where is India’s super rich investing? Aniru...',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: 'https://www.360.one/perspective/thought-leadership/1/Where-is-india-super-rich-investing',
              tags: [
                {
                  key: 'type',
                  value: 'Investing',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/360_ONE_Articles/8.png',
              pdf: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/WeeklyReport.pdf',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Reviewing investment portfolios, asse...',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: 'https://www.livemint.com/money/personal-finance/reviewing-investment-portfolios-assessing-performance-and-rebalancing-11711544747802.html',
              tags: [
                {
                  key: 'type',
                  value: 'Asset Allocation',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/360_ONE_Articles/9.png',
              pdf: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/WeeklyReport.pdf',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Investment cycle, not quarterly earnings to driv...',
              subtitle: '',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: 'https://economictimes.indiatimes.com/markets/expert-view/investment-cycle-not-quarterly-earnings-to-drive-volume-growth-going-forward-mayur-patel/articleshow/108550540.cms?from=mdr',
              tags: [
                {
                  key: 'type',
                  value: 'Markets',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/Thought_Leadership/360_ONE_Articles/10.png',
              pdf: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/WeeklyReport.pdf',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
          ],
        },
      ],
    },
    {
      tab_name: 'In The News',
      page: [
        {
          heading: 'link-tag-list',
          subheading: '',
          is_downloadable: false,
          is_shareable: true,
          type: 'image-link-tag',
          cards: [
            {
              title: '360 ONE-backed Neoliv raises initi...',
              subtitle:
                '360 ONE-backed residential real estate platform Neoliv has raised ₹300 crore in its first fund, which has a total corpus of ₹1,50...',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: 'https://www.thehindubusinessline.com/news/real-estate/360-one-backed-neoliv-raises-initial-300-crore-in-first-real-estate-fund/article67950634.ece',
              tags: [
                {
                  key: '',
                  value: '',
                },
                {
                  key: '',
                  value: '',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/IntheNews/Neoliv.png',
              pdf: '',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Real estate consultancy firm Anar...',
              subtitle:
                'Anarock, a real estate consultancy firm, has secured Rs 200 crore funding from 360 ONE Asset. The funds will be used to enhance th...',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: 'https://economictimes.indiatimes.com/industry/services/property-/-cstruction/real-estate-consultancy-firm-anarock-raises-rs-200-crore-from-360-one-asset-management/articleshow/107420255.cms',
              tags: [
                {
                  key: '',
                  value: '',
                },
                {
                  key: '',
                  value: '',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/IntheNews/Anarock.png',
              pdf: '',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: 'Indian wealth management revolu...',
              subtitle:
                'Yatin Shah, Co-Founder of 360 ONE and Joint CEO of 360 ONE Wealth, one of the country’s largest wealth management com...',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: 'https://www.pwmnet.com/indian-wealth-management-revolution-gathers-pace',
              tags: [
                {
                  key: '',
                  value: '',
                },
                {
                  key: '',
                  value: '',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/IntheNews/Yatin.png',
              pdf: '',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: '360 ONE Prime Limited to Raise u...',
              subtitle:
                '360 ONE Prime Limited (formerly known as IIFL Wealth Prime Limited), a wholly-owned subsidiary of 360 ONE WAM Limited (form...',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: 'https://archive.iiflwealth.com/newsroom/press_releases/360-one-prime-limited-raise-rs-1000-crores-public-issue-secured-rated',
              tags: [
                {
                  key: '',
                  value: '',
                },
                {
                  key: '',
                  value: '',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/IntheNews/PrimeLimited.png',
              pdf: '',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: '360 ONE WAM reports 14% PAT gro...',
              subtitle:
                '360 ONE WAM Ltd has declaresd its Q4FY23 earnings and first interim dividend for the financial year 2023-24. Its annual r...',
              text: '',
              subText1: '',
              subText2: '',
              subText3: '',
              link: 'https://www.livemint.com/market/stock-market-news/360-one-wam-reports-14-pat-growth-in-fy23-board-declares-first-interim-dividend-for-fy24-11683278292659.html',
              tags: [
                {
                  key: '',
                  value: '',
                },
                {
                  key: '',
                  value: '',
                },
              ],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/IntheNews/WAM.png',
              pdf: '',
              logo: '',
              video: '',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
          ],
        },
      ],
    },
    {
      tab_name: 'Leadership Speak',
      page: [
        {
          heading: '',
          subheading: '',
          is_downloadable: false,
          is_shareable: false,
          type: 'video-desig-list',
          cards: [
            {
              title: 'CNBC-TV18 Interview: Investing for HNIs',
              subtitle: '',
              text: 'Himadri Chatterjee',
              subText1: 'Head of Advisory',
              subText2: '',
              subText3: '',
              link: '',
              tags: [],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/LeadershipSpeak/Himadri_Thumbnail.png',
              pdf: '',
              logo: '',
              video:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/CNBC_TV18_InterviewInvestingforHNIs.mp4',
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
            {
              title: "CNBC-TV18's MF Corner",
              subtitle: '',
              text: 'Sahil Kapoor',
              subText1: 'Senior EVP',
              subText2: '',
              subText3: '',
              link: '',
              tags: [],
              image:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/LeadershipSpeak/SahilKapoor_Thumbnail.png',
              pdf: '',
              logo: '',
              video:
                "https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/research/CNBC_TV18's_MFCornerwithSahilKapoor.mp4",
              color: '',
              field1: '',
              field2: '',
              field3: '',
            },
          ],
        },
      ],
    },
  ],
};

export enum ResearchViews {
  PDF_TAG_LIST = 'pdf-tag-list',
  VIDEO_GRID = 'video-grid',
  PDF_LINK_TAG = 'pdf-link-tag',
  IMAGE_LINK_TAG = 'image-link-tag',
  VIDEO_DESIGN_LIST = 'video-desig-list',
}
