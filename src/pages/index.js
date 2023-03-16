import {useZustandStore} from "../../store/store";
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import {shallow} from "zustand/shallow";
import {AuthContext} from "../../contexts/authContext";
import Head from "../../components/Head.js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AdminView from "../../components/AdminView";
import jwtDecode from "jwt-decode";


export default function Home() {
  const [data, setData] = useState([]);
  const router = useRouter()
  const [idToken, setIdToken] = useZustandStore(
    (state) => [state.idToken, state.setIdToken],
    shallow
  )

  const {isAuthorized, setIsAuthorized} = useContext(AuthContext)

  async function callBackend(urls) {
    const jwt = jwtDecode(idToken)
    console.log(jwt)
    try {
      const responses = await Promise.all(urls.map((url) => fetch(url, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      })));
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
      if (data) {
        const expired = data['expired']
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
      console.log(data);
      setData(data);
    } catch (err) {
      console.log(err);
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
    <div>
      <Head/>
      <Header/>
      {/* <TAView data={data} callBackend={callBackend}/> */}
      {isAuthorized && <AdminView data={data} callBackend={callBackend}/>}
      <Footer/>
    </div>
  );
}
