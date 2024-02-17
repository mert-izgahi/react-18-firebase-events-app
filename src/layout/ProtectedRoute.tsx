import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user); // Update isAuthenticated based on user presence
            setIsLoading(false); // Set loading to false once the authentication state is determined
        });

        return () => {
            unsubscribe(); // Unsubscribe from the auth state changes when component unmounts
        };
    }, []);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login"); // Redirect to login page if not authenticated
        }
    }, [isAuthenticated, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return children;
}

export default ProtectedRoute;
