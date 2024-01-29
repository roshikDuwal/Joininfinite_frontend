import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import MyEvents from "./pages/event/MyEvents";
import NoNavbar from "./utils/NoNavbar";
import Header from "./components/ui/header/Header";
import Error from "./pages/error/Error";
import HomeV2 from "./pages/home/HomeV2";
import { authorizationAxiosInstance } from "./axios/Axios";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/Context";
import ChangeUserDetail from "./pages/setting/ChangeUserDetail";
import ChangePassword from "./pages/setting/ChangePassword";
import UploadProfile from "./pages/setting/UploadProfile";


const Routing = () => {
  const user_id = localStorage.getItem("user_id");

  const { userDetail, setUserDetail } = useContext(UserContext);

  const getUserDetail = async (user_id) => {
    try {
      const res = await authorizationAxiosInstance.get(`/users/${user_id}`);
      setUserDetail(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user_id) {
      getUserDetail(user_id);
    }
  }, [user_id]);

  return (
    <>
      <Router>
        <NoNavbar>
          <Header />
        </NoNavbar>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeV2 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-events"
            element={
              <ProtectedRoute>
                {userDetail && userDetail.role === "Organizer" && <MyEvents />}
              </ProtectedRoute>
            }
          />


          <Route
            path="settings/user-detail"
            element={
              <ProtectedRoute>
                <ChangeUserDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/upload-image"
            element={
              <ProtectedRoute>
                <UploadProfile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default Routing;
