import Image from "next/image";

export default function SignInWithSlack() {

  const handleSignIn = async () => {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/slack/install`)
    const json = await response.json()
    window.location.href = json['redirect_url']
  }

  return (
    <button
      onClick={handleSignIn}
      style={{
        alignItems: "center",
        color: "#fff",
        backgroundColor: "#4A154B",
        border: "1px solid #ddd",
        borderRadius: "4px",
        display: "inline-flex",
        fontFamily: "Lato, sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        height: "120px",
        justifyContent: "center",
        textDecoration: "none",
        width: "312px"
      }}
    >
      <Image priority src="images/slack-button.svg" alt="Slack Button" width="32" height="32"/>&nbsp;
      Sign In with Slack
    </button>
  )
}