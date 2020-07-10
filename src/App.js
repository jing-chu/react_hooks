import React from "react"
import AssetsInfo from './components/AssetsInfo'
import CollectionsInfo from './components/CollectionsInfo'
import "./styles.css"

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      assets: [],
      masterIdObj:{},  
    }
}

  setDataFromCollection = (dataFromCollection)=>{
    this.setState({
      assets:dataFromCollection
    })
  }

  setMasterId = (collectionId, masterId)=> {
    const T=this.state.masterIdObj
    T[collectionId]=masterId
    this.setState({masterIdObj: T})
  }

  render(){
    const curMasterId=this.state.assets.length===0 ? 0 : 
      this.state.masterIdObj[this.state.assets[0].collectionId]  

    return(
      <div className="app">
        <CollectionsInfo setDataFromCollection={this.setDataFromCollection}
          setDefaultMasterId={this.setMasterId}
          masterIdObj={this.state.masterIdObj}     
          />
   
        <AssetsInfo selectedAssets={this.state.assets}
          setMasterId={this.setMasterId}
          masterId={curMasterId}
          />
      </div>
    )
  }
}
