import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export const useZustandStore = create(
  persist(
    (set) => ({
      idToken: null,
      setIdToken: (idToken) => set(
        () => ({
          idToken: idToken
        })
      )
    }),
    {
      name: 'id-token-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)