import {useRouter} from "next/router";
import {useEffect} from "react";
import SignInWithSlack from "../../components/SignInWithSlack";
import {useZustandStore} from "../../store/store";
import {shallow} from "zustand/shallow";

export default function Login() {
  const [idToken, setIdToken] = useZustandStore(
    (state) => [state.idToken, state.setIdToken],
    shallow
  )
  const router = useRouter()

  useEffect(() => {
    if (idToken) {
      router.back()
    }
    const urlSearchParams = new URLSearchParams(window.location.href.split('?')[1])
    if (urlSearchParams.has('id_token')) {
      setIdToken(urlSearchParams.get('id_token'))
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <SignInWithSlack/>
}