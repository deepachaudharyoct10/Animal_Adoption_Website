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
