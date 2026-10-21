export type ParcelStatus = "pending" | "delivered" | "failed";

export type Parcel = {
  id: number;
  address: string;
  city: string;
  postalCode: string;
  distance: number;
  status: ParcelStatus;

  recipient: string;
  phone: string;
  codAmount: number;
  deliveryWindow: string;
  notes: string;
};

export const parcels: Parcel[] = [
  {
    id: 10243,
    address: "Grunwaldzka 102",
    city: "Gdańsk",
    postalCode: "80-244",
    distance: 1.4,
    status: "pending",
    recipient: "Anna Kowalska",
    phone: "+48 501 234 567",
    codAmount: 49.9,
    deliveryWindow: "14:00–16:00",
    notes: "Call on arrival. Entrance from the courtyard.",
  },
  {
    id: 10244,
    address: "Kołobrzeska 34",
    city: "Gdańsk",
    postalCode: "80-394",
    distance: 2.1,
    status: "delivered",
    recipient: "Marek Nowak",
    phone: "+48 502 345 678",
    codAmount: 0,
    deliveryWindow: "12:00–14:00",
    notes: "Leave at reception if recipient is unavailable.",
  },
  {
    id: 10245,
    address: "Długa 12",
    city: "Gdańsk",
    postalCode: "80-831",
    distance: 3.8,
    status: "failed",
    recipient: "Katarzyna Wiśniewska",
    phone: "+48 503 456 789",
    codAmount: 89,
    deliveryWindow: "10:00–13:00",
    notes: "Recipient did not answer.",
  },
  {
    id: 10246,
    address: "Aleja Niepodległości 18",
    city: "Sopot",
    postalCode: "81-704",
    distance: 0.9,
    status: "pending",
    recipient: "Piotr Zieliński",
    phone: "+48 504 567 890",
    codAmount: 125.5,
    deliveryWindow: "16:00–18:00",
    notes: "Call 5 minutes before arrival.",
  },
  {
    id: 10247,
    address: "Chmielna 7",
    city: "Gdańsk",
    postalCode: "80-748",
    distance: 4.3,
    status: "delivered",
    recipient: "Julia Kamińska",
    phone: "+48 505 678 901",
    codAmount: 0,
    deliveryWindow: "09:00–12:00",
    notes: "Apartment 24.",
  },
];
