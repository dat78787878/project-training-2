import React, {  useEffect, useState } from 'react';
import helloApi from '../api/helloApi';

const Hello = () => {

    const [hello, setHello] = useState("");
    const [hello1, setHello1] = useState("1");

    useEffect(() => {
      const fetchHello = async () => {
        try {
          const params = {
            // _page: 1,
            // _limit: 10,
          };
          const response = await helloApi.getAll(params);
          console.log(response);
          setHello(response);
          console.log(hello)
        } catch (error) {
          console.log('Failed to fetch', error);
        }
      }
      fetchHello();
    }, []);
    
  return (
      <>
      <div>{hello}</div>
     <div>{hello1}</div>
      </>
    
  )
}

export default Hello