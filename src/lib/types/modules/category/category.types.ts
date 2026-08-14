export type Category = {
  id: string;
  name: string;
  services: {
    id: string;
    name: string;
    description: string;
  }[];
  totalServicesUnderThisCategory: number;
};
