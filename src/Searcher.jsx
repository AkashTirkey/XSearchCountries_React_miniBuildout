// import {TextField} from "@mui/material"
import React from 'react'
import styles from "./styles/Countries.module.css"

export default function Searcher({handleChange}){
    return(
        <div>
            <input type='text' placeholder='Search for Countries........' onChange={handleChange} className={styles.searchInput}/>
            
        </div>
    )
}