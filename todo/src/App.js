import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './pages/Header/Header';
import { Routes, Route} from 'react-router'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Tasks from './pages/tasks/tasks'

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/api/login" element={<Login></Login>}></Route>
      <Route path="/api/register" element={<Register></Register>}></Route>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path="/api/tasks" element={<Tasks></Tasks>}></Route>
    </Routes>
    </>
  );
}

export default App;
