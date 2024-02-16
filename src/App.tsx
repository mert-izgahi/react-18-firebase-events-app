import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventsPage from "./pages/EventsPage";
import EditEventPage from "./pages/EditEventPage";
import CreateEventPage from "./pages/CreateEventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./layout";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:slug" element={<EventPage />} />
                <Route path="/events/create" element={<CreateEventPage />} />
                <Route path="/events/:slug/edit" element={<EditEventPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/forget-password"
                    element={<ForgetPasswordPage />}
                />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
}

export default App;
