export default function AdminView() {

  async function callBackend() {
    const response = await fetch(process.env.NEXT_PUBLIC_TA_METRICS);
    const responseJSON = await response.json();
    console.log(responseJSON)
  }

  callBackend()
  
  return (
  <div>
    <h1 className="text-4xl font-bold text-center">
      TA-Metrics
    </h1>
  </div>
 )
}

