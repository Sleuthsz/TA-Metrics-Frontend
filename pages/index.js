import Head from '../components/Head.js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminView from '../components/AdminView';
import TAView from "../components/TAView";

export default function Home() {
  return (
    <div>
      <Head/>
      <Header/>
      <AdminView/>
        <TAView/>
      <Footer/>
    </div>
  )
}
