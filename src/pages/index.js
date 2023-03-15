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

  const {token, setToken} = useContext(AuthContext)

  const clickTest = async () => {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/slack/test`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })

    const json = await response.json()
    console.log(json)
    if (json) {
      const expired = json['expired']
      if (expired) {
        setIdToken(null)
        setToken(null)
        await router.push('/login')
      }
    }
  }

  useEffect(() => {
    if (!idToken) {
      router.push('/login')
    } else {
      setToken(idToken)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <HTMLHead/>
      <main>
        {token &&
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