import {useZustandStore} from "../store/store";
import {shallow} from "zustand/shallow";
import {useContext} from "react";
import {AuthContext} from "../contexts/authContext";
import {useRouter} from "next/router";
import Image from "next/image";

export default function Header() {
  const router = useRouter()
  const [idToken, setIdToken] = useZustandStore(
    (state) => [state.idToken, state.setIdToken],
    shallow
  )
  const {setIsAuthorized} = useContext(AuthContext)
  const logout = async () => {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/slack/logout`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
    const json = await response.json()
    const expired = json['expired']
    if (expired) {
      setIdToken(null)
      setIsAuthorized(false)
      await router.push('/login')
    }
  }
  return (
    <div>
      <header
        className="w-screen p-4 bg-blue-300 text-center text-dark-gray-500 bottom-0 border-b-2 border-solid border-black">
        <nav>
        <Image
          src="https://ce.seattlecentral.edu/sites/conted/files/inline-images/code-fellows-logo-compact-2-color-1.png"
          alt="Code Fellows logo"
          width={120}
          height={120}
          className="absolute"
        />
          <button
            onClick={logout}
            className="p-1 mt-3 text-white border-4 border-black rounded bg-metal right absolute top-0 right-0 h-10 w-16 mr-4"
          >
            Logout
          </button>
        </nav>
        <h1 className="text-4xl mt-2 font-bold text-center">TA-Metrics</h1>
      </header>
    </div>
  )
}
