import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { FirebaseService } from "../firebase";
// import { database } from '../firebase';

function ListView() {
  const [data, setData] = useState([]);
  const dataListRef = ref(FirebaseService.getInstance().database, 'data'); // Replace with your database location

  useEffect(() => {
    const dataListener = onValue(dataListRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataFromDatabase = snapshot.val();
        setData(Object.values(dataFromDatabase));
      }
    });

    return () => {
      dataListener();
    };
  }, []);

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Word:</strong> {item.word}, <strong>Note:</strong> {item.note}
            {console.log(item, index)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListView;
