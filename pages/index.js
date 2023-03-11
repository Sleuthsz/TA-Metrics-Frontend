import Head from '../components/Head.js'
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminView from '../components/AdminView'

export default function Home() {
  return (
    <div>
      <Head/>
      <Header/>
      <AdminView/>
      <Footer/>
    </div>
  )
}
