import React, { useEffect, useState } from "react";
import axios from 'axios'
import styles from './styles/Countries.module.css'
import Searcher from "./Searcher";
// import { debounce } from "@mui/material";

const Countries = () =>{
    const[countries,setCountries]=useState([]);
    const[loading,setLoading]=useState(true);
    const[searchVal, setSearchVal] = useState("");
    // const[debounceTimer,setDebounceTimer] = useState(null)
    const[allCountries,setAllCountries] = useState([]);

      const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchVal(value);

    // IMPORTANT: restore full list when cleared
    if (value === "") {
      setCountries(allCountries);
      return;
    }

    const filtered = allCountries.filter((country) =>
      country.common.toLowerCase().includes(value)
    );

    setCountries(filtered);
  };

    //Debounced Search
    // useEffect(()=>{
    //     if(debounceTimer){
    //         clearTimeout(debounceTimer);
    //     }
        
    //     const timer = setTimeout(() => {
    //         const filtered = allCountries.filter((country)=>
    //             country.common.toLowerCase().includes(searchVal.toLowerCase())
    //         )
    //         setCountries(filtered);
    //     },500)

    //     setDebounceTimer(timer)
    // },[searchVal,allCountries])

    useEffect(()=>{
        const fetchCountries = async() => {
            try {
                const response = await axios.get("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
                console.log("response:",response.data);
                setCountries(response.data)
                setAllCountries(response.data);
            } catch (error) {
                console.error("Couldn't fetch the data",error)
            }
            finally{
                setLoading(false);
            }
        }

        fetchCountries();
    },[])

    if(loading) return <h3>Loading.....</h3>

    return(
        <>
        <Searcher handleChange={handleChange}/>
        <div className={styles.grid}>
        {countries.map((item)=>(
            <div className={`${styles.gridItem} countryCard`} key={item.common}>
                <img src={item.png} alt={item.common} className={styles.image}/>
                <p>{item.common}</p>

            </div>
        ))}

        {/* {searchVal && countries.length === 0 && (
            <p className={styles.notFound}>Country/State not Found</p>
        )} */}

        </div>  
        </>
    )
}

export default Countries;