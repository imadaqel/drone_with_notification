// import logo from './logo.svg';
import './App.css';
import React, {useEffect,useState} from 'react';
import { io } from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
    // console.log('message')

  },[]);

  useEffect(() => { 
    socket?.on('welcome', message=>{
      console.log(message)
      // console.log('welcome',)
    });
  },[socket]);



  // useEffect(() => {
  //   initiateSocketConnection();
  //   subscribeToChat((err, data) => {
  //     console.log(data);
  //   });
  //   return () => {
  //     disconnectSocket();
  //   }
  // }, []);
  return (
    <div className="App">
    <p>notification</p>
    </div>
  );
}

export default App;
