import Head from "../components/Head.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminView from "../components/AdminView";
import { useState, useEffect } from "react";
import TAView from "../components/TAView.js";

export default function Home() {
  const [data, setData] = useState([]);

  async function callBackend(urls) {
    try {
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
      console.log(data);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Head />
      <Header />
      {/* <TAView data={data} callBackend={callBackend}/> */}
      <AdminView data={data} callBackend={callBackend} />
      <Footer />
    </div>
  );
}
