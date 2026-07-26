export interface Animal {
  _id: string;
  name: string;
  type: string;
  breed?: string;
  age?: number;
  gender?: "male" | "female";
  healthStatus?: string;
  vaccinationStatus?: string;
  rescueStory?: string;
  images?: string[];
  location: string;
  status: "available" | "adopted";
  createdAt?: string;
}

export interface AdoptionRequest {
  _id: string;
  user: { _id: string; name: string; email: string; phone?: string };
  animal: { _id: string; name: string; type: string; breed?: string; images?: string[]; status: string };
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  occupation: string;
  previousExperience: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface RescueReport {
  _id: string;
  reporter: { _id: string; name: string; email: string; phone?: string };
  reporterName: string;
  reporterPhone: string;
  animalType: string;
  description: string;
  location: string;
  photo: string;
  rescueStatus: "pending" | "rescued" | "not rescued";
  createdAt: string;
}

export interface Donation {
  _id: string;
  donor: { _id: string; name: string; email: string };
  donorName: string;
  email?: string;
  amount: number;
  purpose?: string;
  transactionId: string;
  createdAt: string;
}
