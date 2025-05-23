export interface Pet {
  id: string;
  name: string;
  species: string;
  sex: string;
  weight: string | number;
  sterilized: boolean;
  breed: string;
  urlImage?: string;
  dob: Date;
  isActive: boolean;
  color: string;
  owner: {
    id: string
    username: string;
    email: string;
    phone: string;
    address: string;
    urlImage: string;
  };
  vaccinationHistory: VaccinationRecord[];
  medicalRecord: MedicalRecord[];
  notes: string[];
  microchip: string | null;
  isLost: boolean;
  lostPetHistory: LostPetHistory[];
}

interface VaccinationRecord {
  id: string;
  type: VaccinationRecordType;
  date: Date;
  nextDate: Date;
  status: boolean;
}

export interface LostPetHistory {
  id: string;
  foundAt: null;
  description: string;
  status: string;
  location: string;
  lastSeen: Date;
  reward: number
}

interface MedicalRecord {
  id: string;
  type: MedicalRecordType;
  date: Date;
  description: string;
}

export enum MedicalRecordType {
  Consulta = "Consulta",
  Cirugia = "Cirugia",
  Desparacitacion = "Desparacitacion",
  Otro = "Otro",
}

export enum VaccinationRecordType {
  Rabia = "Rabia",
  Parvovirus = "Parvovirus",
  Moquillo = "Moquillo",
  Leptospirosis = "Leptospirosis",
  Otro = "Otro",
}
