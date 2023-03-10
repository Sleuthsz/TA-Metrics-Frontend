import {create} from "zustand";
import {devtools} from "zustand/middleware";

export const useZustandStore = create(
  devtools((set) => ({
    idToken: null,
    setIdToken: (idToken) => set(
      () => ({
        idToken: idToken
      })
    )
  }))
)