import React, { useState, useEffect } from "react"
import "../styles.css"
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class AssetsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      sortAssets:[]
    }
  }


  setSortAssets = (sortKey)=>{
    const compare_fun=(a, b)=>{
      if(a[sortKey] < b[sortKey]){
              return -1;
      }else if(a[sortKey] > b[sortKey]){
              return 1;
      }else{
              return 0;
      }
    }
    this.setState({sortAssets: this.state.sortAssets.sort(compare_fun)})
  }

  componentWillReceiveProps(props){
    this.setState({
      sortAssets: props.selectedAssets
    })
  }

  render() {
    return (
      <div>
        <div className="sortForm">
          {
            this.props.selectedAssets.length!==0?
            <SortForm 
            setSortAssets={this.setSortAssets}
            /> 
            : null
          }
          
        </div>
        
        <div className="assetsInfo">
          {
            this.state.sortAssets.map(asset =>
              <AssetCard
                key={asset.id}
                ID={asset.id}
                name={asset.name}
                path={`/images/${asset.path}`}
                collectionId={asset.collectionId}
                setMasterId={this.props.setMasterId}
                masterId={this.props.masterId}
                
              />)
         }
        </div>
      </div>
    )
  }
}

export const SortForm = (props) => {
  const [value, setValue] = useState('name')

  const handleChange = (e) => {
    setValue(e.target.value)
 }

  const handleSubmit = (e) => {
    props.setSortAssets(value)
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="sort-label">
        Sort by:
      <select className="sort-select" value={value} onChange={handleChange}>
          <option value="name">Name</option>
          <option value="id">Id</option>
        </select>
      </label>
      <input type="submit" value="Sort" />
    </form>
  );

}

export const AssetCard = (props) => {
  const handleClick = (e) => {
    e.preventDefault()
    props.setMasterId(props.collectionId, props.ID)
  }

  return (
    <div className="asset-card">
      <img src={props.path} alt={props.name} width="150" height="150" />
      <div className="asset-detail">
        <p>Name: {props.name}</p>
        <p>ID: {props.ID}</p>
        {
          (this.props.ID === props.masterId) ?
            <FontAwesomeIcon icon={faThumbtack} size="2x" />
            : <button className="master" onClick={handleClick}>
              Set Master
              </button>
        }
      </div>
    </div>
  )

}