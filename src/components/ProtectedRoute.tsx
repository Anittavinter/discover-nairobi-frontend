import { ReactNode } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requireOrganizer?: boolean;
}

export function ProtectedRoute({ children, requireOrganizer = false }: ProtectedRouteProps) {
  const { isLoggedIn, isOrganizer } = useAuth();

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  if (requireOrganizer && !isOrganizer) {
    return <Redirect to="/become-organizer" />;
  }

  return <>{children}</>;
}