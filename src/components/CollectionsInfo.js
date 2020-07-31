import React, { useState, useEffect } from "react"
import "../styles.css"
import { getCollectionsAsync } from "../api/data.js"
import { getAssetsByCollectionAsync } from "../api/data.js"
import { getAssetByIdAsync } from "../api/data.js"


export default function CollectionsInfo ({setDataFromCollection, setDefaultMasterId, masterIdObj}) {
  const [ collections, setCollections ] = useState([])

  useEffect(() => {
    getCollectionsAsync().then((data) => {
      setCollections(data)
      data.forEach(collection => {
        setDefaultMasterId(collection.id, collection.masterAssetId)
      })
    })
  },[])

  const getRecurName = (tag) => {
    if('subTag' in tag === false){
      return tag.name
    }
    return `${tag.name} > ${getRecurName(tag.subTag)}`
  }

  return (
    <div className="collectionsInfo">
      <h1>Please select one collection</h1>
      {collections.map(collection =>
        <CollectionCard
          key={collection.id}
          ID={collection.id}
          name={collection.name}
          tag={getRecurName(collection.tags)}
          setDataFromCollection={setDataFromCollection}
          masterId={masterIdObj[collection.id] || collection.masterAssetId}
        />
      )}
    </div>
  )

} 

export const CollectionCard = ({ID,name,tag,setDataFromCollection,masterId}) =>  {

  const [masterPath, setMasterPath] = useState("")

  const handleClick = (e) => {
    e.preventDefault()
    let collectionId = ID
    getAssetsByCollectionAsync(collectionId).then((data) => {
      setDataFromCollection(data)
    })
  }


  useEffect(() => {
    getAssetByIdAsync(masterId).then((data) => {
    setMasterPath("/images/" + data.path )
    })
  },[masterId])
    
    return (
      <div>
        <p >{tag}</p>
        <div className="collection-card">
          <img className="collection-img" src={masterPath} alt={name} onClick={handleClick} width="150" height="150" />
          <div className="collection-detail">
            <p className="collection-select" onClick={handleClick}>
              {name}
            </p>
          </div>
        </div>
      </div>
    )
  
}