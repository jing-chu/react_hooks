import React, { useState } from "react"
import AssetsInfo from './components/AssetsInfo'
import CollectionsInfo from './components/CollectionsInfo'
import "./styles.css"


export default function App(){
  const [assets, setAssets] = useState([])
  
  const [masterIdObj, setMasterIdObj] = useState({})

  const setMasterId = (collectionId, masterId)=> {
    if (masterIdObj[collectionId]!== masterId){
      const T={...masterIdObj}
      T[collectionId]=masterId   
      setMasterIdObj(T)
    }
  }
  
  const curMasterId = assets.length === 0 ? 0 : masterIdObj[assets[0].collectionId] 

  return(
    <div className="app">
      <CollectionsInfo setDataFromCollection={(dataFromCollection)=>{setAssets(dataFromCollection)}}
        setDefaultMasterId={setMasterId}
        masterIdObj={masterIdObj}     
        />
  
      <AssetsInfo selectedAssets={assets}
        setMasterId={setMasterId}
        masterId={curMasterId}
        />
    </div>
  )

}
