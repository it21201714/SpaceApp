import { useEffect, useState } from "react"
import FooterE from "../components/Earth/FooterE";
import MainE from "../components/Earth/MainE"
import SidebarE from "../components/Earth/SidebarE"
import HashLoader from "react-spinners/HashLoader";
import Header from "../components/Header";


export default function Earth(){
    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal(){
    setShowModal(!showModal); 
  }

  
  useEffect(() => {
    async function fetchApiData(){
      const NASA_KEY = import.meta.env.VITE_NASA_SECRET_KEY;
      const url = `https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2019-01-01&dim=0.15&api_key=${NASA_KEY}`;
      try{
        const response = await fetch(url);
        const apiData = await response.json();
        setData(apiData);
      }catch(error){
        console.log(error.message);
      }

    }

    fetchApiData();
  },[])

  return (
    <div className="flexing">
      {data ? (<MainE data={data} />):(
        <div className="loader ">
          <HashLoader color="white" size={120} />
          <h1 className="loaderh1">Loading...</h1>
        </div>
      )

  }
      {data && (<FooterE data={data} handleToggleModal={handleToggleModal}/>)}
      {showModal && (<SidebarE data={data} handleToggleModal={handleToggleModal}/>)}
      
    </div>
  )
}