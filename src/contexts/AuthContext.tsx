import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types for user data and authentication
export interface User {
   id: string;
   email: string;
   name: string;
   country: string;
   state: string;
   city: string;
   role: string;
   active: boolean;
   // Add other user properties as needed
}

export interface AuthContextType {
   user: User | null;
   loading: boolean;
   login: (email: string, password: string) => Promise<void>;
   signup: (name: string, email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
   isAuthenticated: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};

// AuthProvider component
interface AuthProviderProps {
   children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   // Check for existing session on app load by checking stored user data
   useEffect(() => {
      const checkAuthStatus = () => {
         try {
            const userData = localStorage.getItem("userData");
            console.log('AuthContext - Initial check - userData from localStorage:', userData);

            if (userData) {
               const parsedUser = JSON.parse(userData);
               console.log('AuthContext - Parsed user data:', parsedUser);
               setUser(parsedUser);
            } else {
               // No user data found, user is not authenticated
               console.log('AuthContext - No userData found in localStorage');
               setUser(null);
            }
         } catch (error) {
            console.error("AuthContext - Error checking auth status:", error);
            // Clear invalid data and set user to null
            localStorage.removeItem("userData");
            setUser(null);
         } finally {
            console.log('AuthContext - Setting loading to false');
            setLoading(false);
         }
      };

      checkAuthStatus();
   }, []);

   const login = async (email: string, password: string): Promise<void> => {
      setLoading(true);
      try {
         const response = await fetch("https://folio-hszb.onrender.com/auth/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include", // This allows the server to set cookies
            body: JSON.stringify({ email, password }),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
         }

         const data = await response.json();
         console.log('Login response data:', data);
         
         // Store user data in both localStorage and React state
         // The JWT token is automatically stored in cookies by the browser
         if (data.user) {
            console.log('Setting user data:', data.user);
            localStorage.setItem("userData", JSON.stringify(data.user));
            setUser(data.user);
            console.log('User set, isAuthenticated should now be:', !!data.user);
         } else {
            console.log('No user data in response');
         }
      } catch (error) {
         console.error("Login error:", error);
         throw error;
      } finally {
         setLoading(false);
      }
   };

   const signup = async (name: string, email: string, password: string): Promise<void> => {
      setLoading(true);
      try {
         const response = await fetch("https://folio-hszb.onrender.com/auth/signup", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include", // This allows the server to set cookies
            body: JSON.stringify({ name, email, password }),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Signup failed");
         }

         const data = await response.json();
         console.log('Signup response data:', data);

         // Store user data in both localStorage and React state
         // The JWT token is automatically stored in cookies by the browser
         if (data.user) {
            console.log('Setting user data:', data.user);
            localStorage.setItem('userData', JSON.stringify(data.user));
            setUser(data.user);
            console.log('User set, isAuthenticated should now be:', !!data.user);
         } else {
            console.log('No user data in response');
         }
      } catch (error) {
         console.error("Signup error:", error);
         throw error;
      } finally {
         setLoading(false);
      }
   };

   const logout = async (): Promise<void> => {
      try {
         // Call the server logout endpoint to clear the cookie
         await fetch("https://folio-hszb.onrender.com/auth/logout", {
            method: "POST",
            credentials: "include",
         });
      } catch (error) {
         console.error("Logout error:", error);
      } finally {
         // Clear both localStorage and user state regardless of server response
         localStorage.removeItem("userData");
         setUser(null);
      }
   };

   const value: AuthContextType = {
      user,
      loading,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
   };

   // Debug the auth context value
   console.log('AuthContext - Current state:', { user, loading, isAuthenticated: !!user });

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
