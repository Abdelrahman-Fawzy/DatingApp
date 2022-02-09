import { Photo } from "./photo";

export interface Member {
  id: number;
  username: string;
  age: number;
  photoUrl: string;
  createdOn: Date;
  lastActive: Date;
  gender: string;
  knownAs: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  country: string;
  city: string;
  photos: Photo[];
}
