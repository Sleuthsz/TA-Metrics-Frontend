import {useState} from "react";

export default function SignInWithSlack() {
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/slack/install`)
    const json = await response.json()
    window.location.href = json['redirect_url']
  }

  return (
    <button onClick={handleSignIn} disabled={loading}>
      {loading ? 'Signing In...' : 'Sign In with Slack'}
    </button>
  )
}