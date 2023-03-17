import {useZustandStore} from "../../store/store";
import {shallow} from "zustand/shallow";
import {useRouter} from "next/router";
import {AuthContext} from "../../contexts/authContext";
import {useContext, useEffect} from "react";
import {PacmanLoader} from "react-spinners";

export default function Redirect() {
  const [idToken, setIdToken] = useZustandStore(
    (state) => [state.idToken, state.setIdToken],
    shallow
  )
  const router = useRouter()
  const {setIsAuthorized} = useContext(AuthContext)

  useEffect(() => {
    if (idToken) {
      router.back()
    }

    const urlSearchParams = new URLSearchParams(window.location.href.split('?')[1])
    if (urlSearchParams.has('id_token')) {
      setIdToken(urlSearchParams.get('id_token'))
      setIsAuthorized(true)
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <PacmanLoader color="#FF0000" loading="true"/>
}