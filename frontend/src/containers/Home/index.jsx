import React, {  useEffect, useState } from 'react';
import helloApi from '../../api/helloApi';

const Hello = () => {

    const [text, setText] = useState("");

    useEffect(() => {
      const fetchHello = async () => {
        try {
        //   const params = {
        //     // _page: 1,
        //     // _limit: 10,
        //   };
        //   const response = await helloApi.getAll(params);
          const response = await helloApi.getAll();
          console.log(response);
          setText(response);
          console.log(text)
        } catch (error) {
          console.log('Failed to fetch', error);
        }
      }
      fetchHello();
    }, []);
    
  return (
      <>
      <div>{text}</div>
    
      </>
    
  )
}

export default Hello