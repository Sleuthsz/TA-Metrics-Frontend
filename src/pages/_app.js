import '../styles/globals.css'
import {AuthContext} from "../../contexts/authContext";
import {useState} from "react";


export default function App({Component, pageProps}) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const value = {isAuthorized, setIsAuthorized}

  return (
    <AuthContext.Provider value={value}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}
