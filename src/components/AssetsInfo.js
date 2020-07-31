import React, { useState } from "react"
import "../styles.css"
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSortForm from "./useSortForm"

export default function AssetsInfo({selectedAssets, setMasterId, masterId}) { 
  const [data, setSortAssets] = useSortForm(selectedAssets)
  

  return (
    <div>
      <div className="sortForm">
        {
          selectedAssets.length!==0?
          <SortForm 
          setSortAssets={setSortAssets}
          /> 
          : null
        }
        
      </div>
      
      <div className="assetsInfo">
        {
          data.map(asset =>
            <AssetCard
              key={asset.id}
              ID={asset.id}
              name={asset.name}
              path={`/images/${asset.path}`}
              collectionId={asset.collectionId}
              setMasterId={setMasterId}
              masterId={masterId}              
            />)
        }
      </div>
    </div>
  )
}

export const SortForm = ({setSortAssets}) => {
  const [value, setValue] = useState('name')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSortAssets(value)
  }


  return (
    <form onSubmit={handleSubmit}>
      <label className="sort-label">
        Sort by:
      <select className="sort-select" value={value} onChange={e => setValue(e.target.value)}>
          <option value="name">Name</option>
          <option value="id">Id</option>
        </select>
      </label>
      <input type="submit" value="Sort" />
    </form>
  );

}

export const AssetCard = ({ ID, name, path, collectionId, setMasterId, masterId }) => {

  return (
    <div className="asset-card">
      <img src={path} alt={name} width="150" height="150" />
      <div className="asset-detail">
        <p>Name: {name}</p>
        <p>ID: {ID}</p>
       
        {
          (ID === masterId) ?
            <FontAwesomeIcon icon={faThumbtack} size="2x" />
            : <button className="master" onClick={()=>{setMasterId(collectionId, ID)}}>
              Set Master
              </button>
        } 
    
      </div>
    </div>
  )

}