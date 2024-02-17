import React from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export default ProtectedRoute;
