import { createContext, ReactNode, useContext, useState } from "react";

import {
  parcels as initialParcels,
  Parcel,
  ParcelStatus,
} from "../data/parcels";

type ParcelsContextType = {
  parcels: Parcel[];

  updateParcelStatus: (id: number, status: ParcelStatus) => void;
};

const ParcelsContext = createContext<ParcelsContextType | undefined>(undefined);

type ParcelsProviderProps = {
  children: ReactNode;
};

export function ParcelsProvider({ children }: ParcelsProviderProps) {
  const [parcels, setParcels] = useState<Parcel[]>(initialParcels);

  function updateParcelStatus(id: number, status: ParcelStatus) {
    setParcels((currentParcels) =>
      currentParcels.map((parcel) =>
        parcel.id === id
          ? {
              ...parcel,
              status,
            }
          : parcel,
      ),
    );
  }

  return (
    <ParcelsContext.Provider
      value={{
        parcels,
        updateParcelStatus,
      }}
    >
      {children}
    </ParcelsContext.Provider>
  );
}

export function useParcels() {
  const context = useContext(ParcelsContext);

  if (!context) {
    throw new Error("useParcels must be used inside ParcelsProvider");
  }

  return context;
}
