import { ApiResponse } from '../api.types';

export type GetResearchReponse = ApiResponse<ResearchData[]>;

export interface ResearchData {
  tab_id: string;
  table_name: string;
  pages: ResearchRecord[];
}

export interface ResearchRecord {
  heading: string;
  subheading: string;
  is_downloadable: boolean;
  is_shareable: boolean;
  type: string;
  cards: ResearchCard[];
  page_id: string;
  tab_id: string;
}

export interface ResearchCard {
  title: string;
  subtitle: string;
  text: string;
  link: string;
  tags: Tag[];
  image_link: string;
  pdf_link: string;
  logo: string;
  video_link: string;
  color: string;
  field1: string;
  field2: string;
  field3: string;
  card_id: string;
  page_id: string;
  sub_text1: string;
  sub_text2: string;
  sub_text3: string;
  page_type: string;
  article_link: string;
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

export enum ResearchViews {
  PDF_TAG_LIST = 'pdf_tag_list',
  VIDEO_GRID = 'video_grid',
  PDF_LINK_TAG = 'pdf_link_tag',
  IMAGE_LINK_TAG = 'image_link_tag',
  VIDEO_DESIGN_LIST = 'video_design_list',
}

export interface UpdateTabRequest {
  tab_id: string;
  tab_name: string;
}

export interface UpdatePageRequest {
  heading: string;
  subheading: string;
  is_downloadable: boolean;
  is_shareable: boolean;
  type: string;
}
