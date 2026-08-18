export interface PublicService {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: { name: string };
}

// technician by service
export interface ServiceTechnician {
  id: string;
  bio: string;
  name: string;
  averageRating: number;
  hourlyRate: number;
  serviceName: string;
  serviceCategory: string;
  serviceDescription: string;
}