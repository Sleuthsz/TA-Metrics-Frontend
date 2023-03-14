import HTMLHead from "../../components/HTMLHead";
import {withAuth} from "../../auth/withAuth";
import {useZustandStore} from "../../store/store";

function Home() {
  const idToken = useZustandStore((state) => state.idToken)
  const clickTest = async () => {
    await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/slack/users`, {
      headers: {
        Authentication: `Bearer ${idToken}`
      }
    })
  }
  return (
    <>
      <HTMLHead/>
      I am a protected page
      <br/>
      <button onClick={clickTest}>Test</button>
      {/*<Header/>*/}
      {/*<AdminView/>*/}
      {/*<Footer/>*/}
    </>
  )
}

export default withAuth(Home)
