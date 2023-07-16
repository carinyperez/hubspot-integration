import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const response = await axios.get("/api/v1/token");
      setToken(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const setSettings = (email, token) => {
    window.hsConversationsSettings = {
      loadImmediately: false,
      identificationEmail: email,
      identificationToken: token
    };
  };

  const setUpChat = () => {
    if (window.HubSpotConversations) {
      displayChat();
    } else {
      window.hsConversationsOnReady = [
        () => {
          displayChat();
        },
      ];
    }
    const script = document.createElement('script');
    script.src = '//js.hs-scripts.com/40377677.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };

  const displayChat = () => {
    if (window.HubSpotConversations) {
      console.log('The API is already ready');
      window.HubSpotConversations.widget.load();
    } else {
      console.log('The API is not ready');
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      setSettings("gob@example.com", token);
      setUpChat();
    }
  }, [token]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;
