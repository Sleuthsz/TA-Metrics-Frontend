import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SignInWithSlack from "../../components/SignInWithSlack";
import { useZustandStore } from "../../store/store";
import { shallow } from "zustand/shallow";
import Image from "next/image";
import { AuthContext } from "../../contexts/authContext";

export default function Login() {
  const [expiredMessage, setExpiredMessage] = useState("");
  const [idToken, setIdToken] = useZustandStore(
    (state) => [state.idToken, state.setIdToken],
    shallow
  );
  const router = useRouter();

  const { setIsAuthorized } = useContext(AuthContext);

  useEffect(() => {
    if (idToken) {
      router.back();
    }

    const urlSearchParams = new URLSearchParams(
      window.location.href.split("?")[1]
    );
    if (urlSearchParams.has("expired")) {
      setIdToken(null);
      setIsAuthorized(false);
    }
    if (urlSearchParams.has("message")) {
      setExpiredMessage(urlSearchParams.get("message"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className=" w-full h-24 flex">
        <Image
          src="https://ce.seattlecentral.edu/sites/conted/files/inline-images/code-fellows-logo-compact-2-color-1.png"
          alt="Code Fellows logo"
          width={240}
          height={240}
        />
      </div>
      <h1 className="text-4xl font-bold font-serif text-center my-8">
        TA Metrics
      </h1>
      <div className="flex flex-col items-center justify-center flex-grow">
        {expiredMessage && (
          <p className="text-red-500 font-semibold">{expiredMessage}</p>
        )}
        <SignInWithSlack className="mt-4" />
      </div>
    </div>
  );
}
