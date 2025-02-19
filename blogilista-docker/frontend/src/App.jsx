import { useState, useEffect} from 'react';
import Login from './components/Login';
import Notification from "./components/Notification";
import userUtils from "./utils/userUtils";
import Blogs from './components/Blogs';
import LoggedIn from './components/LoggedIn';

function App() {

  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setUser(userUtils.fetchUser());
  }, []);


  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000)
  }

  const notif = () => {
    if (notification) {
      return (
        <Notification msg={notification}/>
      )
    }
    return null;
  }


  if (!user) {
    return (
      <div>
        {notif()}
        <Login setUser={setUser} showNotification={showNotification}/>
      </div>
    )
  }
  return (
    <div>
      {notif()}
      <LoggedIn setUser={setUser} user={user} showNotification={showNotification}/>
      <Blogs user={user} showNotification={showNotification}/>
    </div>
  )

}

export default App
