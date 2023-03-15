import {useRouter} from "next/router";
import {useContext, useEffect} from "react";
import SignInWithSlack from "../../components/SignInWithSlack";
import {useZustandStore} from "../../store/store";
import {shallow} from "zustand/shallow";
import {AuthContext} from "../../contexts/authContext";

export default function Login() {
  const [idToken, setIdToken] = useZustandStore(
    (state) => [state.idToken, state.setIdToken],
    shallow
  )
  const router = useRouter()

  const {setToken} = useContext(AuthContext)

  useEffect(() => {
    if (idToken) {
      router.back()
    }
    const urlSearchParams = new URLSearchParams(window.location.href.split('?')[1])
    if (urlSearchParams.has('id_token')) {
      setIdToken(urlSearchParams.get('id_token'))
      setToken(urlSearchParams.get('id_token'))
      router.push('/')
    }
    if (urlSearchParams.has('expired')) {
      setIdToken(null)
      setToken(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <SignInWithSlack/>
}