import  { useState, useEffect } from 'react'

export default function useSortForm (initialData) {
  const [ data, setData ] = useState(initialData) 

  useEffect(() => {
    setData(initialData)
  },[initialData]) 

  const setSortAssets = (sortKey)=>{
        const compare_fun=(a, b)=>{
            if(a[sortKey] < b[sortKey]){
                return -1;
            }else if(a[sortKey] > b[sortKey]){
                return 1;
            }else{
                return 0;
            }
        }   
    setData([...data.sort(compare_fun)]) 
  } 

  return [data, setSortAssets]   
  
}
 
