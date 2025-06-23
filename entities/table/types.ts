export interface Guest {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  side: "groom" | "bride";
}

export interface Table {
  id: string;
  name: string;
  guests: Guest[];
}
