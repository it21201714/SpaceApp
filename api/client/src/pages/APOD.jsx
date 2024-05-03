import { useEffect, useState } from "react"
import Footer from "../components/APOD/Footer";
import Main from "../components/APOD/Main"
import Sidebar from "../components/APOD/Sidebar"
import HashLoader from "react-spinners/HashLoader";
import Header from "../components/Header";


export default function APOD(){
    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal(){
    setShowModal(!showModal); 
  }

  
  useEffect(() => {
    async function fetchApiData(){
      const NASA_KEY = import.meta.env.VITE_NASA_SECRET_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
      try{
        const response = await fetch(url);
        const apiData = await response.json();
        setData(apiData);
        console.log(data);
      }catch(error){
        console.log(error.message);
      }

    }

    fetchApiData();
  },[])

  return (
    <div className="flexing">
      {data ? (<Main data={data} />):(
        <div className="loader ">
          <HashLoader color="white" size={120} />
          <h1 className="loaderh1">Loading...</h1>
        </div>
      )

  }
      {data && (<Footer data={data} handleToggleModal={handleToggleModal}/>)}
      {showModal && (<Sidebar data={data} handleToggleModal={handleToggleModal}/>)}
      
    </div>
  )
}