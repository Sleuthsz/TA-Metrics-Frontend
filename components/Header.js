import {useZustandStore} from "../store/store";
import {shallow} from "zustand/shallow";
import {useContext} from "react";
import {AuthContext} from "../contexts/authContext";
import {useRouter} from "next/router";

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
