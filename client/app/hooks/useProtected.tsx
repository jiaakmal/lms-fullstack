import {redirect} from 'next/navigation';
import userAuth from './userAuth';


interface ProtectedProps {
    children: React.ReactNode;
    }

export default function Protected({children}: ProtectedProps) {
    // Check if the user is authenticated
  const isAuthenticated = userAuth();
  console.log("authenticated to see profile page ", isAuthenticated)
    // If not authenticated, redirect to the login page
    return isAuthenticated ?  children : redirect('/');
}

