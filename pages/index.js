import Head from "../components/Head.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminView from "../components/AdminView";
import { useState, useEffect } from "react";


export default function Home() {
  const [data, setData] = useState([]);

  async function callBackend(urls) {
    try {
      const responses = await Promise.all(urls.map(url => fetch(url)));
      const data = await Promise.all(responses.map(response => response.json()));
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
      <AdminView 
      data={data} 
      callBackend={callBackend} 
      setData={setData} 
      />
      <Footer />
    </div>
  );
}
