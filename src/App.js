// VIEWS
import LogIn from './views/session/signIn.view'

// ROUTE
import RouteIndex from './routes/index.route'


import {ToastContainer} from 'react-toastify'

import {useSelector} from 'react-redux'

function App() {
  let {token} = useSelector(state => state.Session);
  return (
    <>
      <ToastContainer />
      {token === null ? <LogIn /> : <RouteIndex />}
    </>
  );
}

export default App;
