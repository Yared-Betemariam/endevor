import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddPost from "./pages/AddPost";
import MyPosts from "./pages/MyPosts";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="sign-in" element={<SignIn />} />
        {isLoggedIn && (
          <>
            <Route path="add-post" element={<AddPost />} />
            <Route path="posts" element={<MyPosts />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
