import '../styles/globals.css'
import {AuthContext} from "../../contexts/authContext";
import {useState} from "react";


export default function App({Component, pageProps}) {
  const [token, setToken] = useState(null)
  const value = {token, setToken}

  return (
    <AuthContext.Provider value={value}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}
