import {useRouter} from "next/router";
import {useZustandStore} from "../store/store";
import {useEffect} from "react";
import SignInWithSlack from "../components/SignInWithSlack";

export const withAuth = (WrappedComponent) => {
  return function Wrapper(props) {
    const router = useRouter()
    const idToken = useZustandStore((state) => state.idToken)

    useEffect(() => {
      if (!idToken) {
        router.push('/login')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idToken])

    return <WrappedComponent {...props} />
  }
}