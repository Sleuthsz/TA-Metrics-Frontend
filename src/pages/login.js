import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import SignInWithSlack from "../../components/SignInWithSlack";
import {useZustandStore} from "../../store/store";
import {shallow} from "zustand/shallow";
import {AuthContext} from "../../contexts/authContext";

export default function Login() {
  const [expiredMessage, setExpiredMessage] = useState('')
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
    if (urlSearchParams.has('expired')) {
      setIdToken(null)
      setIsAuthorized(false)
    }
    if (urlSearchParams.has('message')) {
      setExpiredMessage(urlSearchParams.get('message'))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {expiredMessage && expiredMessage}
      <br/>
      <SignInWithSlack/>
    </>
  )
}