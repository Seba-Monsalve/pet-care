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
  owner: {
    username: string;
    email: string;
    phone: string;
    address: string;
  };
  vaccinationHistory: VaccinationRecord[];
  medicalRecord: MedicalRecord[];
  notes: string[];
  microchip: string | null;
}

interface VaccinationRecord {
  id: string;
  type: VaccinationRecordType;
  date: Date;
  nextDate: Date;
  status: boolean;
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
