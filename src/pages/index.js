import { useZustandStore } from "../../store/store";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { AuthContext } from "../../contexts/authContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AdminView from "../../components/AdminView";
import HTMLHead from "../../components/HTMLHead";

export default function Home() {
  const [data, setData] = useState([]);
  const [names, setNames] = useState([]);
  const router = useRouter();
  const [idToken, setIdToken] = useZustandStore(
    (state) => [state.idToken, state.setIdToken],
    shallow
  );

  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);

  async function callBackend(urls) {
    try {
      const responses = await Promise.all(
        urls.map((url) =>
          fetch(url, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          })
        )
      );
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
      if (data) {
        const expired = data["expired"];
        if (expired) {
          setIdToken(null);
          setIsAuthorized(false);
          await router.push({
            pathname: "/login",
            query: {
              message: "Your session is either invalid or expired",
            },
          });
        }
      }
      setData(data);
    } catch (err) {}
  }

  const fetchNames = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_TA_NAMES, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await response.json();
      setNames(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!idToken) {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <div>
      <HTMLHead />
      {isAuthorized && (
        <>
          <Header />
          <AdminView
            data={data}
            callBackend={callBackend}
            setData={setData}
            fetchNames={fetchNames}
            names={names}
            setNames={setNames}
          />
          <Footer data={data} />
        </>
      )}
    </div>
  );
}
