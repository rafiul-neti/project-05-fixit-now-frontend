// service section types
type Service = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
};

export interface ServicesSectionProps {
  services: Service[];
}
