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
  subText1: SubText1;
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
  key: Key;
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
      tab_name: 'Market Analysis',
      page: [
        {
          heading: 'Global Market Trends',
          subheading: 'An in-depth look at current market trends worldwide',
          is_downloadable: true,
          is_shareable: true,
          type: 'report',
          cards: [
            {
              title: 'Q1 Market Overview',
              subtitle: 'A comprehensive summary of market activities in Q1',
              text: 'This report provides detailed insights into the market performance during Q1, including growth trends, challenges, and opportunities.',
              subText1: SubText1.SeniorEVP,
              subText2: 'Finance Department',
              subText3: 'Published: April 2024',
              link: 'https://example.com/q1-market-overview',
              tags: [
                { key: Key.Type, value: 'Quarterly Report' },
                { key: Key.Type, value: 'Finance' },
              ],
              image: 'https://example.com/images/q1-market-overview.png',
              pdf: 'https://example.com/reports/q1-market-overview.pdf',
              logo: 'https://example.com/images/company-logo.png',
              video: '',
              color: '#FF5733',
              field1: 'Q1 Summary',
              field2: 'Market Trends',
              field3: 'Opportunities and Challenges',
            },
            {
              title: 'Emerging Technologies',
              subtitle: 'Impact on the Global Market',
              text: 'An analysis of how emerging technologies are shaping various sectors.',
              subText1: SubText1.HeadOfAdvisory,
              subText2: 'Technology Advisory Group',
              subText3: 'Published: March 2024',
              link: 'https://example.com/emerging-technologies',
              tags: [
                { key: Key.Type, value: 'Technology Report' },
                { key: Key.Type, value: 'Market Analysis' },
              ],
              image: 'https://example.com/images/emerging-technologies.png',
              pdf: 'https://example.com/reports/emerging-technologies.pdf',
              logo: 'https://example.com/images/company-logo.png',
              video: 'https://example.com/videos/emerging-technologies.mp4',
              color: '#33B5FF',
              field1: 'Technology Impact',
              field2: 'Sector Analysis',
              field3: 'Future Trends',
            },
          ],
        },
        {
          heading: 'Regional Market Overview',
          subheading: 'A comparative analysis of regional markets',
          is_downloadable: true,
          is_shareable: false,
          type: 'dashboard',
          cards: [
            {
              title: 'Asia-Pacific Market Snapshot',
              subtitle: 'Key insights into the Asia-Pacific market',
              text: 'Highlights the growth drivers and challenges in the Asia-Pacific region.',
              subText1: SubText1.Empty,
              subText2: 'Research Department',
              subText3: 'Published: February 2024',
              link: 'https://example.com/asia-pacific-market',
              tags: [
                { key: Key.Type, value: 'Regional Report' },
                { key: Key.Type, value: 'Market Analysis' },
              ],
              image: 'https://example.com/images/asia-pacific-market.png',
              pdf: 'https://example.com/reports/asia-pacific-market.pdf',
              logo: '',
              video: '',
              color: '#33FF57',
              field1: 'Growth Drivers',
              field2: 'Challenges',
              field3: 'Opportunities',
            },
          ],
        },
      ],
    },
    {
      tab_name: 'Industry Reports',
      page: [
        {
          heading: 'Healthcare Industry Insights',
          subheading: 'An in-depth overview of the healthcare sector',
          is_downloadable: false,
          is_shareable: true,
          type: 'report',
          cards: [
            {
              title: 'Pharmaceutical Market Trends',
              subtitle: 'Analysis of the current pharmaceutical market',
              text: 'Provides insights into the global pharmaceutical market, focusing on emerging trends and challenges.',
              subText1: SubText1.SeniorEVP,
              subText2: 'Healthcare Group',
              subText3: 'Published: January 2024',
              link: 'https://example.com/pharmaceutical-market-trends',
              tags: [
                { key: Key.Type, value: 'Healthcare Report' },
                { key: Key.Type, value: 'Pharmaceuticals' },
              ],
              image: 'https://example.com/images/pharmaceutical-market-trends.png',
              pdf: 'https://example.com/reports/pharmaceutical-market-trends.pdf',
              logo: 'https://example.com/images/company-logo.png',
              video: '',
              color: '#FF33A7',
              field1: 'Market Trends',
              field2: 'Challenges',
              field3: 'Opportunities',
            },
          ],
        },
      ],
    },
    {
      tab_name: 'In the News',
      page: [
        {
          heading: 'Global Market Trends',
          subheading: 'An in-depth look at current market trends worldwide',
          is_downloadable: true,
          is_shareable: true,
          type: 'report',
          cards: [
            {
              title: 'Q1 Market Overview',
              subtitle: 'A comprehensive summary of market activities in Q1',
              text: 'This report provides detailed insights into the market performance during Q1, including growth trends, challenges, and opportunities.',
              subText1: SubText1.SeniorEVP,
              subText2: 'Finance Department',
              subText3: 'Published: April 2024',
              link: 'https://example.com/q1-market-overview',
              tags: [
                { key: Key.Type, value: 'Quarterly Report' },
                { key: Key.Type, value: 'Finance' },
              ],
              image: 'https://example.com/images/q1-market-overview.png',
              pdf: 'https://example.com/reports/q1-market-overview.pdf',
              logo: 'https://example.com/images/company-logo.png',
              video: '',
              color: '#FF5733',
              field1: 'Q1 Summary',
              field2: 'Market Trends',
              field3: 'Opportunities and Challenges',
            },
            {
              title: 'Emerging Technologies',
              subtitle: 'Impact on the Global Market',
              text: 'An analysis of how emerging technologies are shaping various sectors.',
              subText1: SubText1.HeadOfAdvisory,
              subText2: 'Technology Advisory Group',
              subText3: 'Published: March 2024',
              link: 'https://example.com/emerging-technologies',
              tags: [
                { key: Key.Type, value: 'Technology Report' },
                { key: Key.Type, value: 'Market Analysis' },
              ],
              image: 'https://example.com/images/emerging-technologies.png',
              pdf: 'https://example.com/reports/emerging-technologies.pdf',
              logo: 'https://example.com/images/company-logo.png',
              video: 'https://example.com/videos/emerging-technologies.mp4',
              color: '#33B5FF',
              field1: 'Technology Impact',
              field2: 'Sector Analysis',
              field3: 'Future Trends',
            },
          ],
        },
        {
          heading: 'Regional Market Overview',
          subheading: 'A comparative analysis of regional markets',
          is_downloadable: true,
          is_shareable: false,
          type: 'dashboard',
          cards: [
            {
              title: 'Asia-Pacific Market Snapshot',
              subtitle: 'Key insights into the Asia-Pacific market',
              text: 'Highlights the growth drivers and challenges in the Asia-Pacific region.',
              subText1: SubText1.Empty,
              subText2: 'Research Department',
              subText3: 'Published: February 2024',
              link: 'https://example.com/asia-pacific-market',
              tags: [
                { key: Key.Type, value: 'Regional Report' },
                { key: Key.Type, value: 'Market Analysis' },
              ],
              image: 'https://example.com/images/asia-pacific-market.png',
              pdf: 'https://example.com/reports/asia-pacific-market.pdf',
              logo: '',
              video: '',
              color: '#33FF57',
              field1: 'Growth Drivers',
              field2: 'Challenges',
              field3: 'Opportunities',
            },
          ],
        },
      ],
    },
    {
      tab_name: 'Leadership Speak',
      page: [
        {
          heading: 'Global Market Trends',
          subheading: 'An in-depth look at current market trends worldwide',
          is_downloadable: true,
          is_shareable: true,
          type: 'report',
          cards: [
            {
              title: 'Q1 Market Overview',
              subtitle: 'A comprehensive summary of market activities in Q1',
              text: 'This report provides detailed insights into the market performance during Q1, including growth trends, challenges, and opportunities.',
              subText1: SubText1.SeniorEVP,
              subText2: 'Finance Department',
              subText3: 'Published: April 2024',
              link: 'https://example.com/q1-market-overview',
              tags: [
                { key: Key.Type, value: 'Quarterly Report' },
                { key: Key.Type, value: 'Finance' },
              ],
              image: 'https://example.com/images/q1-market-overview.png',
              pdf: 'https://example.com/reports/q1-market-overview.pdf',
              logo: 'https://example.com/images/company-logo.png',
              video: '',
              color: '#FF5733',
              field1: 'Q1 Summary',
              field2: 'Market Trends',
              field3: 'Opportunities and Challenges',
            },
            {
              title: 'Emerging Technologies',
              subtitle: 'Impact on the Global Market',
              text: 'An analysis of how emerging technologies are shaping various sectors.',
              subText1: SubText1.HeadOfAdvisory,
              subText2: 'Technology Advisory Group',
              subText3: 'Published: March 2024',
              link: 'https://example.com/emerging-technologies',
              tags: [
                { key: Key.Type, value: 'Technology Report' },
                { key: Key.Type, value: 'Market Analysis' },
              ],
              image: 'https://example.com/images/emerging-technologies.png',
              pdf: 'https://example.com/reports/emerging-technologies.pdf',
              logo: 'https://example.com/images/company-logo.png',
              video: 'https://example.com/videos/emerging-technologies.mp4',
              color: '#33B5FF',
              field1: 'Technology Impact',
              field2: 'Sector Analysis',
              field3: 'Future Trends',
            },
          ],
        },
        {
          heading: 'Regional Market Overview',
          subheading: 'A comparative analysis of regional markets',
          is_downloadable: true,
          is_shareable: false,
          type: 'dashboard',
          cards: [
            {
              title: 'Asia-Pacific Market Snapshot',
              subtitle: 'Key insights into the Asia-Pacific market',
              text: 'Highlights the growth drivers and challenges in the Asia-Pacific region.',
              subText1: SubText1.Empty,
              subText2: 'Research Department',
              subText3: 'Published: February 2024',
              link: 'https://example.com/asia-pacific-market',
              tags: [
                { key: Key.Type, value: 'Regional Report' },
                { key: Key.Type, value: 'Market Analysis' },
              ],
              image: 'https://example.com/images/asia-pacific-market.png',
              pdf: 'https://example.com/reports/asia-pacific-market.pdf',
              logo: '',
              video: '',
              color: '#33FF57',
              field1: 'Growth Drivers',
              field2: 'Challenges',
              field3: 'Opportunities',
            },
          ],
        },
      ],
    },
  ],
};
