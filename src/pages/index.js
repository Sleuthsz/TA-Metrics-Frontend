import HTMLHead from "../../components/HTMLHead";
import {useZustandStore} from "../../store/store";
import {useRouter} from "next/router";
import {useContext, useEffect} from "react";
import {shallow} from "zustand/shallow";
import {AuthContext} from "../../contexts/authContext";

export default function Home() {
  const router = useRouter()
  const [idToken, setIdToken] = useZustandStore(
    (state) => [state.idToken, state.setIdToken],
    shallow
  )

  const {isAuthorized, setIsAuthorized} = useContext(AuthContext)

  const clickTest = async () => {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/slack/test`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })

    const json = await response.json()
    if (json) {
      const expired = json['expired']
      if (expired) {
        setIdToken(null)
        setIsAuthorized(false)
        await router.push({
          pathname: '/login',
          query: {
            message: 'Your session is either invalid or expired'
          },
        })
      }
    }
  }

  useEffect(() => {
    if (!idToken) {
      router.push('/login')
    } else {
      setIsAuthorized(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <HTMLHead/>
      <main>
        {isAuthorized &&
          <>
            I am a protected page
            <br/>
            <button onClick={clickTest}>Test</button>
          </>
        }
      </main>
      {/*<Header/>*/}
      {/*<AdminView/>*/}
      {/*<Footer/>*/}
    </>
  )
}