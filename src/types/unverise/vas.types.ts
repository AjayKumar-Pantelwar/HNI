export interface GetVASResponse {
  status: string;
  data: VASData[];
}

export interface VASData {
  product_name: string;
  product_id: string;
  product_label: string;
  nbfc_specializations?: NbfcSpecializations;
  items?: VASItem[];
  why_immigration?: NbfcSpecializations;
  preferred_by_hni?: PreferredByHni;
  pdfs?: Pdfs;
  insurances?: Insurance[];
  concept_section?: ConceptSection;
  advantage_section?: AdvantageSection;
  criteria?: Criteria;
  estate_planning?: EstatePlanning;
  reasons_why?: ReasonsWhy;
  why_use?: ReasonsWhy;
  title?: string;
  intro?: Intro;
  deals?: DatumDeal[];
  about?: About;
  portfolio?: Portfolio;
  sectors?: Sectors;
  past_deals?: PastDeals;
}

export interface About {
  label: string;
  description: string;
  props: Prop[];
}

export interface Prop {
  label: string;
  value: string;
}

export interface AdvantageSection {
  advantage_title: string;
  advantage_description: string;
}

export interface ConceptSection {
  concept_title: string;
  concept_description: string;
}

export interface Criteria {
  title: string;
  sub_title: string;
  data: CriteriaDatum[];
}

export interface CriteriaDatum {
  card_data: CardDatum[];
  description: string;
}

export interface CardDatum {
  heading: string;
  data: string;
}

export interface DatumDeal {
  label: string;
  all_deals: AllDeal[];
}

export interface AllDeal {
  title: string;
  about_label: string;
  about_icon: string;
  about: string;
  founded: string;
  location: string;
  industry: string;
  sub_industry: string;
  shortlisted_label: string;
  shortlisted_points: string[];
  value_props: Prop[];
  founders: Founders;
  investors: Investors;
  competitors: Competitors;
}

export enum AboutLabel {
  AboutTheCompany = 'About the Company',
}

export interface Competitors {
  label: string;
  all: string[] | null;
}

export enum CompetitorsLabel {
  Competitors = 'Competitors',
  Empty = '',
}

export interface Founders {
  label: string;
  profiles: Profile[] | null;
}

export enum FoundersLabel {
  Empty = '',
  FounderProfile = 'Founder Profile',
}

export interface Profile {
  icon_url: string;
  name: string;
  description: string;
}

export enum Name {
  Founder1 = 'Founder 1',
  Founder2 = 'Founder 2',
  Founder3 = 'Founder 3',
}

export interface Investors {
  label: string;
  all: InvestorsAll[] | null;
}

export interface InvestorsAll {
  icon: string;
  name: string;
}

export enum InvestorsLabel {
  Empty = '',
  Investors = 'Investors',
}

export enum ShortlistedLabel {
  WhyWeShortlisted = 'Why we shortlisted?',
}

export interface EstatePlanning {
  label: string;
  description: string[];
}

export interface Insurance {
  product_name: string;
  product_label: string;
  product_id: string;
  items: InsuranceItem[];
}

export enum InsuranceFormSteps {
  INSURANCE_NAME = 'Insurance Name',
  INTRODUCTION = 'Introduction',
  KEY_FEATURES = 'Key Features',
  BENEFITS = 'Benefits',
  FOOTER = 'Footer',
}

export interface InsuranceFormValues {
  insurance_name: string | undefined;
  insurance_icon: string | undefined;
  insurance_section1_title: string | undefined;
  insurance_logo: string | undefined;
  insurance_section2_title?: string | undefined;
  plan_benefit: PlanBenefit[] | undefined;
  benefits: Benefit[] | undefined;
  insurance_footer: string | undefined;
}
export interface InsuranceItem {
  insurance_icon: string;
  insurance_name: string;
  fixed_income_icon?: string;
  insurance_description: string;
  insurance_subtitle: string;
  insurance_section1_title: string;
  insurance_section2_title: string;
  insurance_note: string;
  insurance_logo: string;
  insurance_short_note: string;
  plan_benefit: PlanBenefit[];
  benefits: Benefit[];
}

export interface Benefit {
  title: string;
}

export interface PlanBenefit {
  benefit_description: string;
  benefit_icon: string;
}

export interface Intro {
  video_url: string;
  topic: string;
  speaker_name: string;
  designation: string;
  company_name: string;
  company_logo: string;
}

export interface VASItem {
  logo: string;
  title: string;
  sub_title: string;
}

export interface NbfcSpecializations {
  label: string;
  wealth_logo: string;
  items: string[];
}

export interface PastDeals {
  label: string;
  deals: PastDealsDeal[];
}

export interface PastDealsDeal {
  icon_url: string;
  value: string;
}

export interface Pdfs {
  label: string;
  pdf: string;
}

export interface Portfolio {
  label: string;
  compositions: Composition[];
}

export interface Composition {
  name: string;
  value: string;
}

export interface PreferredByHni {
  label: string;
  items: PreferredByHniItem[];
}

export interface PreferredByHniItem {
  image: string;
  country_name: string;
  heading: string;
  description: Description[];
}

export interface Description {
  number: string;
  data: string;
}

export interface ReasonsWhy {
  label: string;
  items: string[];
}

export interface Sectors {
  label: string;
  all: SectorsAll[];
}

export interface SectorsAll {
  icon_url: string;
  sector: string;
  perc: string;
}

export const mockGetVASResponse: GetVASResponse = {
  status: 'success',
  data: [
    {
      product_name: 'lending_solutions',
      product_id: '3',
      product_label: 'Strategic lending solutions',
      nbfc_specializations: {
        label: 'Why 360 ONE Wealth?',
        wealth_logo:
          'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/360ONE.png',
        items: [
          'Serving unique needs of HNI clients',
          'Handling complex requirements',
          'Quick turnaround and disbursement',
          'Lending against non - traditional asset classes',
        ],
      },
      items: [
        {
          logo: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/esop_funding.svg',
          title: 'ESOP funding',
          sub_title:
            'Offer loans to employees of various corporates for exercising their ESOP entitlements',
        },
        {
          logo: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/loan_against_securities.svg',
          title: 'Loan Against Securities (LAS)',
          sub_title:
            'Loans against a variety of securities - Listed & unlisted shares, Mutual funds, Fixed income, other securities like AIF, InvIT, REIT',
        },
        {
          logo: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/loan_against_property.svg',
          title: 'Loan Against Property(LAP)',
          sub_title: 'Prime residential & commercial properties in Metro/Tier-1 locations ',
        },
        {
          logo: 'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/las_lap.svg',
          title: 'LAS + LAP',
          sub_title: 'Specialized lending against a combination of liquid and illiquid collateral',
        },
      ],
    },
    {
      product_name: 'immigration_services',
      product_id: '2',
      product_label: 'Global Mobility & Immigration by Investment',
      why_immigration: {
        label: 'Why Immigration by Investment?',
        wealth_logo:
          'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/360ONE.png',
        items: [
          "To safeguard children's future",
          'To have a plan B',
          'For a better quality of life',
          'For a stronger passport (easier global travel)',
        ],
      },
      preferred_by_hni: {
        label: 'Top locations preffered by HNIs',
        items: [
          {
            image:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/immigration/usa.png',
            country_name: 'USA',
            heading: "Children's Education & Permanency",
            description: [
              {
                number: '1',
                data: 'Children who are already in the US for their education/post-education internship or on H1B and would like to settle down and work in the US',
              },
              {
                number: '2',
                data: 'For Parents having young children who aspire to go to the US for education, a Green Card is a major advantage',
              },
              {
                number: '3',
                data: 'Children who have completed their US education, had to return to their home country as they could not get a work visa (H1-B) and would like to go back and work in the US',
              },
            ],
          },
          {
            image:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/immigration/portugal.png',
            country_name: 'Portugal',
            heading: 'Golden Visa : A perfect Plan B',
            description: [
              {
                number: '1',
                data: 'Gateway to the EU PR/Citizenship',
              },
              {
                number: '2',
                data: 'For families who want to have a backup plan. Continue your life in India and parallelly maintain your Portuguese residency by just visiting Portugal for 7 days each year or 14 days across 2 years.',
              },
              {
                number: '3',
                data: 'Good option for children if they aspire to study and settle in the EU',
              },
              {
                number: '4',
                data: 'Visa Free access across Schengen countries, continue to hold your Indian Passport with no impact on Taxation',
              },
            ],
          },
          {
            image:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/immigration/canada.png',
            country_name: 'Canada',
            heading: 'Family Mobility Solution for a better quality of life',
            description: [
              {
                number: '1',
                data: 'Preferred option for investors who are looking at relocating with family and will make Canada their primary base',
              },
            ],
          },
          {
            image:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/immigration/uk.png',
            country_name: 'UK',
            heading: 'Family Mobility Solution for a better quality of life',
            description: [
              {
                number: '1',
                data: 'Better lifestyle for the investor and his family.',
              },
              {
                number: '2',
                data: 'Investors who have a business/family in UK and want to spend more time there',
              },
            ],
          },
          {
            image:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/immigration/carribean.png',
            country_name: 'Carribbean Countires',
            heading: 'A stronger travel document',
            description: [
              {
                number: '1',
                data: 'For families who want to have an overseas passport, citizenship is usually granted within a few months',
              },
              {
                number: '2',
                data: 'Continue your life in India as an overseas citizen, with a passport that permits you visa-free travel to over 150 countries',
              },
            ],
          },
        ],
      },
      pdfs: {
        label: 'Immigration by investment',
        pdf: '',
      },
    },
    {
      product_name: 'specialized_insurance',
      product_label: 'Specialised Insurance',
      product_id: '4',
      insurances: [
        {
          product_name: 'global_insurance_plan',
          product_label: 'Global Health Insurance',
          product_id: '23',
          items: [
            {
              insurance_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/specializedinsurance/manipal_signa.png',
              insurance_name: 'Manipal Cigna (Insurance)',
              fixed_income_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/specializedinsurance/manipal_signa.png',
              insurance_description:
                'Manipal Cigna Global Health Insurance ensures coverage for medical emergencies and offers wide-ranging wellness solutions no matter where you are in the world',
              insurance_subtitle: '',
              insurance_section1_title: 'Why Cigna Global Health?',
              insurance_section2_title: 'Included Services',
              insurance_note:
                'All insurance products are delivered via our group company 360 ONE Prime Limited',
              insurance_logo: '',
              insurance_short_note: 'Note: Does not include GST',
              plan_benefit: [
                {
                  benefit_description: 'Insurance coverage ranging $250k to $2.5Mn',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/insurance_coverage.svg',
                },
                {
                  benefit_description: 'Global cashless access to premier healthcare facilities',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/global_cashless.svg',
                },
                {
                  benefit_description:
                    'Straight-through process requiring only health declaration and no medical tests the age of 50',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/straight_through_process.svg',
                },
                {
                  benefit_description: 'Includes psychological and psychiatric care and services',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/includes_psychological_and_psychiatric.svg',
                },
                {
                  benefit_description:
                    'Policy with a lifetime renewal (subject to renewal of master policy)',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/policy_with_a_lifetime_renewal.svg',
                },
                {
                  benefit_description: 'Lower waiting period for pre-existing diseases (12 months)',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/guaranteed_payment_option.svg',
                },
              ],
              benefits: [
                {
                  title: 'Hospitalisation and International OPD',
                },
                {
                  title:
                    'Emergency international services including International Emergency Evacuation, Medical Repatriation services, Local air ambulance and Hospice',
                },
                {
                  title: 'Expenditure incurred in organ transplants',
                },
                {
                  title: 'Coverage for HIV/AIDS',
                },
                {
                  title: 'Coverage for dental and ocular services',
                },
                {
                  title:
                    'Complimentary services including physiotherapy, AYUSH, osteopathy, chiropractic, acupuncture, and homeopathy',
                },
                {
                  title: 'Coverage for health appliances',
                },
                {
                  title:
                    'Comprehensive set of covers like Robotics & Cyber knife, Minor Surgeries and Psychological care',
                },
                {
                  title:
                    'Avail medical second opinion services from reputed Global medical centres of excellence24/7 customer service through a specialized helpline number and email ID',
                },
              ],
            },
          ],
        },
        {
          product_name: 'savings_insurance_plan',
          product_label: 'Savings Insurance Plan',
          product_id: '33',
          items: [
            {
              insurance_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/specializedinsurance/hdfc_sanchay.png',
              insurance_name: 'HDFC Sanchay Plus (Insurance)',
              fixed_income_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/specializedinsurance/hdfc_sanchay.png',
              insurance_description:
                'This product is suitable for investor who are looking for long term debt allocation with high credit quality. HDFC Life Sanchay Plus materially reduces the reinvestment risk that investor would face with other fixed income products',
              insurance_subtitle: '',
              insurance_section1_title: 'Why Sanchay Plus?',
              insurance_section2_title: 'Key Features and Benefits',
              insurance_note:
                'All insurance products are delivered via our group company 360 ONE Prime Limited',
              insurance_logo: '',
              insurance_short_note: '',
              plan_benefit: [
                {
                  benefit_description: 'Payout structure designed for retirement planning',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/payout_structure_designed.svg',
                },
                {
                  benefit_description: 'Insurance cover 10x annual premium payment term',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/loan_against_security.svg',
                },
                {
                  benefit_description: 'Guaranteed returns since investments made into G-Secs',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/guaranteed_payment_option.svg',
                },
                {
                  benefit_description: 'Lock-in attractive fixed return for decades',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/lock_in.svg',
                },
              ],
              benefits: [
                {
                  title: 'Regular guaranteed returns allow you to plan for future financial goals',
                },
                {
                  title:
                    'Helps to lock in attractive fixed income rate for decades and not get impacted by reinvestment risk',
                },
                {
                  title: 'Investments in G-secs and high credit quality to mitigate risks',
                },
                {
                  title: 'Insurance cover of 10-15 times of annual premium ',
                },
                {
                  title: 'HDFC Sanchay offers Guaranteed tax-free IRR of 6.42%* upto 5 lac premium',
                },
              ],
            },
            {
              insurance_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/specializedinsurance/TATA_AIA.png',
              insurance_name: 'TATA AIA Fortune Guarantee Plus (Insurance)',
              fixed_income_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/specializedinsurance/TATA_AIA.png',
              insurance_description:
                'Non- Participating traditional Life insurance plan where the pay – outs are fixed and guaranteed. Investors gets long term guaranteed return of 6.68%* (this is current yield and subject to change)',
              insurance_subtitle: '',
              insurance_section1_title: 'Why Fortune Guarantee Plus?',
              insurance_section2_title: 'Key Features and Benefits',
              insurance_note:
                'All insurance products are delivered via our group company 360 ONE Prime Limited',
              insurance_logo: '',
              insurance_short_note: '',
              plan_benefit: [
                {
                  benefit_description: 'Payout structure designed for retirement planning',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/payout_structure_designed.svg',
                },
                {
                  benefit_description: 'Insurance cover 10x annual premium payment term',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/loan_against_security.svg',
                },
                {
                  benefit_description: 'Guaranteed returns since investments made into G-Secs',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/guaranteed_payment_option.svg',
                },
                {
                  benefit_description: 'Lock-in attractive fixed return for decades',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/lock_in.svg',
                },
              ],
              benefits: [
                {
                  title: 'Regular guaranteed returns allow you to plan for future financial goals',
                },
                {
                  title:
                    'Helps to lock in attractive fixed income rate for decades and not get impacted by reinvestment risk',
                },
                {
                  title: 'Investments in G-secs and high credit quality to mitigate risks',
                },
                {
                  title:
                    'Insurance cover of 10-15 times of annual premium Long Term guaranteed return of 6.68%* (this is current yield and subject to change)',
                },
              ],
            },
          ],
        },
        {
          product_name: 'term_plan_insurance',
          product_label: 'Term Plan Insurance',
          product_id: '43',
          items: [
            {
              insurance_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/specializedinsurance/TATA_AIA.png',
              insurance_name: 'TATA AIA Term Plan (Insurance)',
              fixed_income_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/specializedinsurance/TATA_AIA.png',
              insurance_description:
                'Term insurance is a life insurance product, which offers financial coverage to the policyholder for a specific time period.',
              insurance_subtitle: '',
              insurance_section1_title: 'Why Tata AIA Term Plan?',
              insurance_section2_title: 'Key Features and Benefits',
              insurance_note:
                'All insurance products are delivered via our group company 360 ONE Prime Limited ',
              insurance_logo: '',
              insurance_short_note: '',
              plan_benefit: [
                {
                  benefit_description: 'Payout structure designed for retirement planning',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/payout_structure_designed.svg',
                },
                {
                  benefit_description: 'Insurance cover 10x annual premium payment term',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/loan_against_security.svg',
                },
                {
                  benefit_description: 'Guaranteed returns since investments made into G-Secs',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/guaranteed_payment_option.svg',
                },
                {
                  benefit_description: 'Lock-in attractive fixed return for decades',
                  benefit_icon:
                    'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/lock_in.svg',
                },
              ],
              benefits: [
                {
                  title: 'Highest sum insured of 100 Cr in the insurance industry',
                },
                {
                  title:
                    'Can be purchased either as an individual or as part of keyman insurance or business insurance',
                },
                {
                  title: 'Ranks in top 3 for claim settlement ratio on a YoY basis',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      product_name: 'accreditation',
      product_id: '1',
      product_label: 'Accreditation',
      concept_section: {
        concept_title: 'The concept:',
        concept_description:
          'Accreditation is a recent SEBI framework allowing several benefits to eligible investors, especially in the PMS and AIF domain.',
      },
      advantage_section: {
        advantage_title: 'Key advantage for you:',
        advantage_description: 'Start investing in PMS and AIFs with lower minimums, e.g., ₹25L',
      },
      criteria: {
        title: 'Eligibility criteria',
        sub_title: 'Individuals : (any one Condition)',
        data: [
          {
            card_data: [
              {
                heading: 'Annual income',
                data: '>₹2Cr',
              },
            ],
            description: '',
          },
          {
            card_data: [
              {
                heading: 'Net worth',
                data: '>₹7.5Cr',
              },
            ],
            description: 'Of which ₹3.75Cr must be in financial assets',
          },
          {
            card_data: [
              {
                heading: 'Annual Income',
                data: '>₹1Cr',
              },
              {
                heading: 'Net worth',
                data: '>₹2Cr',
              },
            ],
            description: 'Of which 50% must be in financial assets',
          },
        ],
      },
    },
    {
      product_name: 'wills_and_succession_planning',
      product_id: '5',
      product_label: 'Estate Planning',
      estate_planning: {
        label: 'Estate planning as a concept',
        description: [
          'Creating wealth is one thing but safeguarding it and passing it seamlessly to the next generation requires care and expertise, whether it is writing a will or setting up trusts to hold assets. Our Estate Planning experts help structure your financial and non-financial assets in an effective, efficient and compliant manner, to ensure compliances in management of assets in our fiduciary capacity and facilitating smooth transmission of assets to future generation.',
        ],
      },
      reasons_why: {
        label: 'Benefits of Estate Planning?',
        items: [
          'Seamless transmission of wealth to next generation',
          'Consolidation of assets',
          'Ringfencing of assets',
          'End use monitoring of funds ',
          'Structured approach',
        ],
      },
      why_use: {
        label: 'Why Us?',
        items: [
          'Over a decade of experience',
          'Advisor of choice to over 850+ families',
          'Acting as corporate trustees to over 400+ trusts, with a total AUM of over 10000 crores',
          'Team of 20+ succession planning specialists',
        ],
      },
    },
    {
      product_name: 'mumbai_angels_network',
      product_id: '6',
      product_label: 'Mumbai Angels Network',
      title: 'Mumbai Angels Network',
      intro: {
        video_url:
          'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/angel_investing_landing.mp4',
        topic: 'Experience Global Angel Investing and Community',
        speaker_name: 'Nandini Mansinghka',
        designation: 'Founder & CEO',
        company_name: 'Mumbai Angels',
        company_logo:
          'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/aif/amcs/mumbai-angels-aif-logo.png',
      },
      deals: [
        {
          label: 'Deals for you',
          all_deals: [
            {
              title: 'Deal 1',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'An AdTech startup offering digital interactive dual display screens to help brands advertise across residential and commercial spaces.',
              founded: '2022',
              location: 'Hyderabad',
              industry: 'Ad-Tech',
              sub_industry: 'Paas',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Strong revenue growth of 100% YoY in FY23; EBITDA positive since Sep’22',
                'Onboarded 800+ clients like Apple, Honda, Amazon, IKEA and advertising agencies in a short span of 2 years of operations',
                'India Digital OOH Advertising Market Size to reach US$3.2 Billion by 2027 at 14.7% CAGR',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: '₹ 95 Cr',
                },
                {
                  label: 'Round Size',
                  value: '₹ 12 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: 'Woksen University, Masters in Marketing',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description: 'Woksen University',
                  },
                ],
              },
              investors: {
                label: '',
                all: null,
              },
              competitors: {
                label: 'Competitors',
                all: ['Adonmo'],
              },
            },
            {
              title: 'Deal 2',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'A top-rated momo and bao brand, with automated production and a tech-driven supply chain.',
              founded: '2016',
              location: 'Hyderabad',
              industry: 'Consumer',
              sub_industry: 'Product',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Seasoned  entrepreneurs with 20+ Yrs of cumulative experience',
                'High online customer retention (74%) showcasing its ability to deliver value and quality of the products',
                'Backed by Rebel Foods, a Strategic Investor',
                'The brand commands a 31% share of the online momo market in Hyderaba and also holds 9% and 7% market shares in Bangalore and Chennai, respectively',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: '₹ 90 Cr',
                },
                {
                  label: 'Round Size',
                  value: '₹ 5 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: ' ISB MBA, and Ed-Tech Co-Founder',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description: ' Michigan State University, SP Jain and Ex- Deloitte',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 3',
                    description: 'SP Jain, Ex- Deloitte',
                  },
                ],
              },
              investors: {
                label: 'Investors',
                all: [
                  {
                    icon: '',
                    name: 'Rebel Foods',
                  },
                ],
              },
              competitors: {
                label: 'Competitors',
                all: ['WoW Momos'],
              },
            },
            {
              title: 'Deal 3',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'The company enables financing for MSMEs using distribution ledger technology.',
              founded: '2021',
              location: 'Noida',
              industry: 'Blockchain',
              sub_industry: 'SaaS',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'The company solves a deep rooted issue in terms of MSME financing through their patented blockchain technology',
                'Their patented technology strengthens the barriers to entry for other players in the sector',
                'They enable savings for MSMEs to the tune of 3-8% across value chains',
                'The founders present a strong suite of experience across    Technology, Domain and Business expertise',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: '₹ 15 Cr',
                },
                {
                  label: 'Round Size',
                  value: '₹ 2 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description:
                      'B.Tech + MBA Finance, 14 Yrs in Supply Chain Finance & SME Procurement',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description: 'CA + MBA, 15 Yrs in Corporate Banking & Industry Finance',
                  },
                ],
              },
              investors: {
                label: '',
                all: null,
              },
              competitors: {
                label: 'Competitors',
                all: ['Nakad, CedAble'],
              },
            },
            {
              title: 'Deal 4',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'An emotionally sensitive social network focused on Gen Z and Gen Alpha for sharing feelings and understanding emotional patterns',
              founded: '2021',
              location: 'Surat',
              industry: 'Social Media',
              sub_industry: 'Product',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Patent in Ad Monetization',
                'Hook model that ensures long term user retention',
                'Potential to go viral quickly due to high user adaptability',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: ' ₹ 9 Cr',
                },
                {
                  label: 'Round Size',
                  value: '₹ 2 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: 'Bachelors in Architecture, Experience in UI/UX Design',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description: 'Bachelors in Architecture, Experience in Design',
                  },
                ],
              },
              investors: {
                label: '',
                all: null,
              },
              competitors: {
                label: '',
                all: null,
              },
            },
            {
              title: 'Deal 5',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'An aggregator platform connecting food providers and customers for authentic and curated catering solutions',
              founded: '2020',
              location: 'Mumbai',
              industry: 'Consumer',
              sub_industry: 'Food & Beverages',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Versatile menu offering a broad selection of customizable food options',
                'Prominent in both B2C and B2B, with clients like PwC, KPMG, TATA, etc',
                'Thoughtful and attractive pricing for customers',
                'SaaS platform to streamline entire order fulfillment, covering supply chain and logistics',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: '₹ 30 Cr',
                },
                {
                  label: 'Round Size',
                  value: '₹ 3 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: '10+ yrs in Investment Banking',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description: '10+ yrs in Investments Banking',
                  },
                ],
              },
              investors: {
                label: 'Investors',
                all: [
                  {
                    icon: '',
                    name: 'Titan Capital',
                  },
                ],
              },
              competitors: {
                label: 'Competitors',
                all: ['Chefkart, Local caterers'],
              },
            },
            {
              title: 'Deal 6',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'A health and wellness brand focused on beauty, skin-care and nutritional well-being.',
              founded: '2020',
              location: 'Hyderabad',
              industry: 'Consumer',
              sub_industry: 'Personal Care',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Low Customer Acquisition, with majority of sales coming through marketplaces',
                'PAT Positive for the past few quarters',
                'High gross margins at 70-80%',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: '₹ 22 Cr',
                },
                {
                  label: 'Round Size',
                  value: '₹ 4 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: 'Experience in digital marketing and Startups',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description: '10+ years as a Corporate Professional ',
                  },
                ],
              },
              investors: {
                label: '',
                all: null,
              },
              competitors: {
                label: 'Competitors',
                all: ['Oziva, Wellbeing, Traya'],
              },
            },
            {
              title: 'Deal 7',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'Employing AI-driven genomics to tackle rare diseases while innovatively repurposing drugs for more effective treatments.',
              founded: '2022',
              location: 'New Delhi',
              industry: 'Deep-Tech',
              sub_industry: 'Genomics',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Received grant from Illumina Accelerator in Cambridge, UK, a leading genomics company worldwide',
                'Secured access to 2000+ samples, equivalent to screening a population of 5 Mn',
                'Uncovered novel targets in rare diseases like Posterior Urethral Valves, Hypospadias, Anorectal Malformation, Congenital Glaucoma and Retinoblastoma',
                'Coming in as a highly specialized player in the Rare Diseases sector',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: '₹ 37.5 Cr',
                },
                {
                  label: 'Round Size',
                  value: ' ₹ 2 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: 'Experience in Bioinformatics',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description:
                      'Experience in Data Science, Translational Medicine, Clinical Biomarker and CDx Implementation',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 3',
                    description: 'Technology Commercialization Expert',
                  },
                ],
              },
              investors: {
                label: '',
                all: null,
              },
              competitors: {
                label: '',
                all: null,
              },
            },
            {
              title: 'Deal 8',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'The company is addressing cancer metastasis drug discovery and identifying patients with higher metastasis risk using integrative platforms.',
              founded: '2018',
              location: 'Bangalore',
              industry: 'Med-Tech',
              sub_industry: 'Cancer Diagnostics',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Strong team led by Harvard Medical School alumni with relevant experience in drug discovery',
                'Strong partnerships in the cancer care ecosystem & Multiple patents filed',
                'Has won multiple awards and recognition in metastasis diagnostics innovation from Global Health and Pharma, UK',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: '₹ 35 Cr',
                },
                {
                  label: 'Round Size',
                  value: '₹ 5.5 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description:
                      'PhD in Biochemistry, Molecular Biology 46 Years of experience in Applied Therapeutics, Infectious Diseases &  Cancer Biology',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description: 'CA + MBA, 15 Yrs in Corporate Banking & Industry Finance',
                  },
                ],
              },
              investors: {
                label: 'Investors',
                all: [
                  {
                    icon: '',
                    name: '92Angels',
                  },
                  {
                    icon: '',
                    name: 'IKP',
                  },
                  {
                    icon: '',
                    name: 'Eden',
                  },
                  {
                    icon: '',
                    name: 'CIIE',
                  },
                ],
              },
              competitors: {
                label: 'Competitors',
                all: ['Freenome, Path AI, Sherlock'],
              },
            },
            {
              title: 'Deal 9',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'Disruptive, no-code, mobile-first cognitive platform, offering data management, insights and automated actions, helping accelerate digital transformation for organizations.',
              founded: '2015',
              location: 'Pune',
              industry: 'B2B SaaS',
              sub_industry: 'PaaS',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Offers a one-stop solution for end-to-end data analytics using both PaaS and Enterprise SaaS models',
                'The pricing range is affordable as compared to its competitors making it accessible to MSMEs and preferable to enterprises',
                'The team has vast experience in the IT sector along with the ex-CEO of TCS on the advisory board',
                'Clientele includes names like Infosys, TCS, Roche, Tawazun, Tata Power etc',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: 'Discount Matrix',
                },
                {
                  label: 'Round Size',
                  value: '₹ 5 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: 'Bharati Vidyapeeth University; 14+ years at AmDocs',
                  },
                ],
              },
              investors: {
                label: 'Investors',
                all: [
                  {
                    icon: '',
                    name: 'Lemon Innovision Ventures',
                  },
                ],
              },
              competitors: {
                label: 'Competitors',
                all: ['IBM, Oracle, Alteryx, Hyper-Science'],
              },
            },
            {
              title: 'Deal 10',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'Packaging solution replacing single use plastic with sustainable and biodegradable options.',
              founded: '2019',
              location: 'Bangalore',
              industry: 'Climate-Tech',
              sub_industry: 'Packaging',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Company controls entire supply chain from sourcing raw material to last mile distribution ensuring quality',
                'Ability to offer customized packaging products to retailers at significantly lower cost (cheaper than plastic)',
                'Fast mover advantage in a largely unorganized industry',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: ' Discount Matrix',
                },
                {
                  label: 'Round Size',
                  value: '₹ 16 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: 'NIFT; 9+ years experience ',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description:
                      'Cardiff University; 12+ years in design, development & procurement innovations for packaging',
                  },
                ],
              },
              investors: {
                label: 'Investors',
                all: [
                  {
                    icon: '',
                    name: 'Blue Ashva Capital',
                  },
                  {
                    icon: '',
                    name: 'Mumbai Angels',
                  },
                ],
              },
              competitors: {
                label: 'Competitors',
                all: ['PulPac, Voidless, ePac Flexible Packaging'],
              },
            },
            {
              title: 'Deal 11',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'The company offers innovative and affordable healthcare monitoring solutions with a major focus on Diabetes.',
              founded: '2019',
              location: 'Bangalore',
              industry: 'Med-Tech',
              sub_industry: 'Medical Devices',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'India, having the 2nd highest diabetic population in the world, serves as an ideal market for such tools that help in the early screening of feet susceptible to neuropathy',
                'Only product of its category that is portable in nature compared to its competitors who provide bulky devices',
                'Multiple accolades received from global entities and competitions',
                'The customer repeat rate has been over 50%, with patents received on design & tech',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: ' Discount Matrix ',
                },
                {
                  label: 'Round Size',
                  value: ' ₹ 4 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: 'IIT Bombay; Ex NetCracker',
                  },
                ],
              },
              investors: {
                label: 'Investors',
                all: [
                  {
                    icon: '',
                    name: 'SINE',
                  },
                  {
                    icon: '',
                    name: 'TiH',
                  },
                  {
                    icon: '',
                    name: 'DERBI Foundation',
                  },
                ],
              },
              competitors: {
                label: 'Competitors',
                all: ['Monofilament, Tip Therm. VIBRA Tip, Biothesiameter'],
              },
            },
            {
              title: 'Deal 12',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'A Cloud kitchen Brand offering healthy and crispy samosas and other tasty Indian snacks with exciting modern flavours.',
              founded: '2015',
              location: 'Bangalore',
              industry: 'Food & Beverages',
              sub_industry: 'QSR',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                '82% growth in bottom-line and 100% increase in sales since MA Investment in Aug 2022 and is on a path to profitability',
                'In partnership with Bikaji, expanding Manufacturing facility to cater Exports volume at equally competitive pricing',
                'Fully automated manufacturing process & high standardization makes it scalable',
                'Backed by Institutional Investors like Fireside Ventures, Better Capital',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: '₹ 95 Cr',
                },
                {
                  label: 'Round Size',
                  value: ' ₹ 12 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description:
                      'Mtech- Biotechnology, 15+ yrs experience in R&D, product development',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description:
                      'Btech- Biotechnology, 15+ years experience in corporate strategy & brand building',
                  },
                ],
              },
              investors: {
                label: 'Investors',
                all: [
                  {
                    icon: '',
                    name: 'Fireside Ventures',
                  },
                  {
                    icon: '',
                    name: 'Better Capital',
                  },
                  {
                    icon: '',
                    name: 'Bikaji',
                  },
                  {
                    icon: '',
                    name: 'Mumbai Angels',
                  },
                  {
                    icon: '',
                    name: 'Equanimity',
                  },
                ],
              },
              competitors: {
                label: 'Competitors',
                all: [
                  'Box8, Fassos, FreshMenu, OYO Cloud Kitchen, Swiggy Cloud Kitchens, Samosa Party ',
                ],
              },
            },
            {
              title: 'Deal 13',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'AI powered tool enabling 1 click translation of video, audio, text, images to 75+ languages.',
              founded: '2020',
              location: 'Bangalore',
              industry: 'Deep-Tech',
              sub_industry: 'Artificial Intelligence',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Backed by Technology focused VC- Inflexor',
                'Patent applied on the method and system for translating a multimedia content ',
                'Only product based company in India that can do all format of translation with just 1 click',
                'Clientele include industry giants like ICICI Bank, zepto, Swiggy, Bajaj, ITC and others ',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: ' Discount Matrix',
                },
                {
                  label: 'Round Size',
                  value: '₹ 8.2 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description:
                      'Ramaiah Institute Of Technology; Ex CISCO, Meaww and Avi Networks',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description: 'Ramaiah Institute Of Technology; Ex Interaction One ',
                  },
                ],
              },
              investors: {
                label: 'Investors',
                all: [
                  {
                    icon: '',
                    name: 'Inflexor',
                  },
                  {
                    icon: '',
                    name: '2AM Ventures',
                  },
                  {
                    icon: '',
                    name: '100X.VC',
                  },
                ],
              },
              competitors: {
                label: 'Competitors',
                all: ['Veed.io, Videoverse, Canva, Invideo'],
              },
            },
            {
              title: 'Deal 14',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'Digital platform for Biomass and Biofuel that connects the Rural and Industrial economies.',
              founded: '2020',
              location: 'Pune',
              industry: 'Energy-Tech',
              sub_industry: 'Bioenergy',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'Founders have 20+years of relevant experience along with marquee industry advisors',
                'Winner of NTPC Startup Challenge for Biomass Digital Marketplace',
                'Enables ease of financing, Digital settlements and Market-based price discovery',
                'Last-mile digital connect for biomass which is built on existing FPO network',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: 'Floor-81 Cr ₹ and Cap-120 Cr Cr ₹',
                },
                {
                  label: 'Round Size',
                  value: '₹ 6.5 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: '',
                profiles: null,
              },
              investors: {
                label: 'Investors',
                all: [
                  {
                    icon: '',
                    name: 'Angels',
                  },
                  {
                    icon: '',
                    name: 'Better Capital',
                  },
                  {
                    icon: '',
                    name: 'Spectrum',
                  },
                ],
              },
              competitors: {
                label: '',
                all: null,
              },
            },
            {
              title: 'Deal 15',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about:
                'Granted Patent on Auto Balancing technology for 2 wheeler vehicles powered by Gyroscope, Sensors and Intelligent Algorithms.',
              founded: '2018',
              location: 'Mumbai',
              industry: 'Deep Tech',
              sub_industry: 'EV',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'The patented AutoBalancing technology which enables a host of path breaking industry-first features providing an unprecedented riding experience like Feet on footboard, ReverseRide and Learner mode etc.',
                "Company's core IP enables it to have a solid revenue opportunity from sale of own EV 2 wheelers as well as B2B licensing of technology",
                'Founders have rich experience and strong academic background',
                'MOU signed with MHI and ARAI for certification, mass production of the technology. MHI/ARAI have provided a grant for the purpose',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: '₹ 82  Cr',
                },
                {
                  label: 'Round Size',
                  value: '₹ 2 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: '',
                  },
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 2',
                    description: ' IIT Madras, ISB; Ex - Strategy at Lodha Group',
                  },
                ],
              },
              investors: {
                label: 'Investors',
                all: [
                  {
                    icon: '',
                    name: 'Super Morpheus',
                  },
                  {
                    icon: '',
                    name: 'Eagle10',
                  },
                  {
                    icon: '',
                    name: 'SINE',
                  },
                  {
                    icon: '',
                    name: 'Ananta Morpheus',
                  },
                ],
              },
              competitors: {
                label: '',
                all: null,
              },
            },
            {
              title: 'Deal 16',
              about_label: 'About the Company',
              about_icon:
                'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/about_the_company.svg',
              about: 'Building a mass premium house of craft liquor brands.',
              founded: '2021',
              location: 'Mumbai',
              industry: 'Consumer',
              sub_industry: 'Beverages',
              shortlisted_label: 'Why we shortlisted?',
              shortlisted_points: [
                'The founder’s family has been in the liquor business for about 3 generations reducing the barriers to entry for the founder',
                'The distillery has chosen rum as its first product as it is the 2nd largest growing segment after whisky',
                'Bigger brands such as Diageo and Pernod don’t have rum in their portfolio, giving this company an advantage',
              ],
              value_props: [
                {
                  label: 'Pre-Money Valuation',
                  value: '₹ 15 Cr',
                },
                {
                  label: 'Round Size',
                  value: '₹ 4 Cr',
                },
                {
                  label: 'Min. Investment',
                  value: '₹ 25 Lacs',
                },
              ],
              founders: {
                label: 'Founder Profile',
                profiles: [
                  {
                    icon_url:
                      'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/fund_manager.svg',
                    name: 'Founder 1',
                    description: 'Wharton MBA, Has run a FMCG startup in the past',
                  },
                ],
              },
              investors: {
                label: '',
                all: null,
              },
              competitors: {
                label: 'Competitors',
                all: ['Segredo Aledia, Captain Morgan & Barcadi'],
              },
            },
          ],
        },
      ],
      about: {
        label: 'About Mumbai Angels',
        description:
          'A Leading Angel Investing platform for early-stage venture investing. Since inception in 2006, they have helped many new-age and innovative endeavours lift off the ground successfully. We are accredited, sector agnostic and diversified.',
        props: [
          {
            label: 'Investments',
            value: '230+',
          },
          {
            label: 'Countries',
            value: '40+',
          },
          {
            label: 'Years',
            value: '17',
          },
          {
            label: 'Exits',
            value: '100+',
          },
          {
            label: 'Composite IRR',
            value: '37%',
          },
        ],
      },
      portfolio: {
        label: 'Portfolio Composition',
        compositions: [
          {
            name: 'Tech Enababled',
            value: '48%',
          },
          {
            name: 'Deep Tech',
            value: '19%',
          },
          {
            name: 'Consumer',
            value: '18%',
          },
          {
            name: 'High Tech',
            value: '15%',
          },
        ],
      },
      sectors: {
        label: 'Top Sectors by Deal Flow ',
        all: [
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/content.svg',
            sector: 'Content',
            perc: '23',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/healthcare.svg',
            sector: 'Healthcare',
            perc: '23',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/education.svg',
            sector: 'Education',
            perc: '22',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/food_and_beverages.svg',
            sector: 'Food and Beverages',
            perc: '19',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/finance.svg',
            sector: 'Finance',
            perc: '18',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/marketing.svg',
            sector: 'Marketing',
            perc: '15',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/human_resources.svg',
            sector: 'Human Resources',
            perc: '13',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/green_tech.svg',
            sector: 'Green Tech',
            perc: '12',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/travel_and_hospitality.svg',
            sector: 'Travel and Hospitality',
            perc: '11',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/app/static/path3/logistics.svg',
            sector: 'Logistics',
            perc: '9',
          },
        ],
      },
      past_deals: {
        label: 'Past Deals',
        deals: [
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/ma/inmobi.png',
            value: '100x Multiple',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/ma/purple.png',
            value: '71x Multiple',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/ma/myntra.png',
            value: '10x Multiple',
          },
          {
            icon_url:
              'https://dev-phoenix-pub.s3.ap-south-1.amazonaws.com/products/vas/ma/exotel.png',
            value: '19x Multiple',
          },
        ],
      },
    },
  ],
};
