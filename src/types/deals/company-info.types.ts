export type CompanyInfoRequest = {
  deal_id: string;
  legal_name: string;
  incorporated_date: string;
  form: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  website_link: string;
};

export type AddTeamRequest = {
  file: File | null;
  name: string;
  designation: string;
  social: string;
  link: string;
};

export type EditTeamRequest = AddTeamRequest;

export type DeleteTeamRequest = {
  deal_id: string;
  ids: string[];
};

export type AddInvestorRequest = {
  file: File | null;
  name: string;
  designation: string;
};

export type EditInvestorRequest = AddInvestorRequest;

export type DeleteInvestorRequest = {
  deal_id: string;
  ids: string[];
};

export type AddNewsRequest = {
  file: File | null;
  title: string;
};

export type EditNewsRequest = AddNewsRequest;

export type DeleteNewsRequest = {
  deal_id: string;
  ids: string[];
};
