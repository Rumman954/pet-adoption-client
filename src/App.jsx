import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import AllPets from './pages/AllPets';
import Login from './pages/Login';
import Register from './pages/Register';
import PetDetails from './pages/PetDetails';
import AddPet from './pages/AddPet';
import MyListings from './pages/MyListings';
import MyRequests from './pages/MyRequests';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="all-pets" element={<AllPets />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="pet/:id"
              element={
                <PrivateRoute>
                  <PetDetails />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Navigate to="/my-requests" replace />} />
            <Route path="my-requests" element={<MyRequests />} />
            <Route path="add-pet" element={<AddPet />} />
            <Route path="my-listings" element={<MyListings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
