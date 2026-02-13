import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import OrderOnline from './pages/OrderOnline';
import Review from './pages/Review';
import AdminDashboard from './pages/Admin/Dashboard';
import ChefPortal from './pages/Chef/Portal';
import WaiterPortal from './pages/Waiter/Portal';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
// Removed global.css import as it's being replaced by tailwind via index.css

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="App min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className={`flex-grow ${!isHome ? 'pt-24' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/order-online" element={<OrderOnline />} />
          <Route path="/review" element={<Review />} />

          {/* Protected Portals */}
          <Route path="/admin" element={
            // <ProtectedRoute role="admin">
            <AdminDashboard />
            // </ProtectedRoute>
          } />
          <Route path="/chef" element={
            // <ProtectedRoute role="chef">
              <ChefPortal />
            // </ProtectedRoute>
          } />
          <Route path="/waiter" element={
            // <ProtectedRoute role="waiter">
              <WaiterPortal />
            // </ProtectedRoute>
          } />

          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;
