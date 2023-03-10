import HTMLHead from "../../components/HTMLHead";
import {withAuth} from "../../auth/withAuth";

function Home() {
  return (
    <>
      <HTMLHead/>
      I am a protected page
      {/*<Header/>*/}
      {/*<AdminView/>*/}
      {/*<Footer/>*/}
    </>
  )
}

export default withAuth(Home)
