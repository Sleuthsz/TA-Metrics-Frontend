import {create} from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";

export const useZustandStore = create(
  devtools(persist(
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
  ))
)