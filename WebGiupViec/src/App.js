import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Service from "./pages/Service";
import Header from "./component/Header/Header";
import Hourly from "./pages/Hourly/index";
import ListService from "./pages/ServiceList/ListService";
import Employee from "./pages/Employee/Employee";
import Footer from "./pages/Footer/Footer";
import ScrollToTop from "./utils/ScrollToTop"; // Import ScrollToTop component
import { Provider } from "react-redux";
import store from "./redux/store/store";
import BookingSuccess from "./pages/BookingSuccess/BookingSuccess";
import WishList from "./pages/Wishlist";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import ProtectedRoute from "./component/ProtectedRoute"; // Import ProtectedRoute
import FavoriteStaff from "./pages/FavoriteStaff";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop /> {/* Đặt ngay sau <Router> */}
        <div className="App">
          <header>
            <Header />
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/list-service" element={<ListService />} />
            <Route path="/hourly" element={<Hourly />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/wishlist" element={<WishList />} />

            {/* Bảo vệ các route yêu cầu đăng nhập bằng ProtectedRoute */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorite-staff"
              element={
                <ProtectedRoute>
                  <FavoriteStaff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-history"
              element={
                <ProtectedRoute>
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-success/:bookingId"
              element={
                <ProtectedRoute>
                  <BookingSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service"
              element={
                <ProtectedRoute>
                  <Service />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
