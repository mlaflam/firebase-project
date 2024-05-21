import React, { useState, useEffect } from 'react';
import { db } from "./firebase.js";
import { addDoc, getDocs, collection, doc, updateDoc, orderBy, query } from "firebase/firestore";

const Poll = () => {
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryResponses = query(collection(db, 'responses'), orderBy('upvotes', 'desc'));
        const querySnapshot = await getDocs(queryResponses);
        const fetchedResponses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResponses(fetchedResponses); //setting initial responses to what we got from database
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData(); // Call the fetchData function once when the component mounts
  }, [responses]);

  const handleAddResponse = async (e) => {
    e.preventDefault();
    if (newResponse.trim() === '') return;

    try {
      const docRef = await addDoc(collection(db, "responses"), {
        text: newResponse,
        upvotes: 0,
      });
      console.log("Created doc with id: ", docRef.id);
      setNewResponse('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleUpvote = async (id, currentUpvotes) => {
    try {
      const responseRef = doc(db, 'responses', id);
      await updateDoc(responseRef, { upvotes: currentUpvotes + 1 });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <h1 className='title'>What's your favorite programming language?</h1>

      <div className='form'>
        <div>
          <form onSubmit={handleAddResponse}>
            <div>
              <input
                type="text"
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                placeholder="Add a new response"
              />
              <button type="submit">Submit</button>
            </div>
          </form>
          <div className='responses'>
            {responses.map(response => (
              <li className='grid' key={response.id}>
                {response.text} - {response.upvotes}
                <button className="upvote-button" onClick={() => handleUpvote(response.id, response.upvotes)}>Upvote</button>
              </li>
            ))}
          </div>

        </div>

      </div>
      
    </div>
  );
};

export default Poll;
