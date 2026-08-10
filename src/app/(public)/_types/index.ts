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

// meet our technicians
type Technician = {
  id: string;
  profilePhoto: string | null;
  bio: string | null;
  experienceYears: number;
  hourlyRate: number;
  serviceAreas: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  availability: {
    startTime: string;
    endTime: string;
    weekendDays: string;
  };
  user: {
    name: string;
  };
  reviews: {
    givenStars: number;
  }[];
  _count: {
    reviews: number;
  };
  technicianServices: {
    service: {
      name: string;
    };
  }[];
};

export interface TechniciansSectionProps {
  technicians: Technician[];
}