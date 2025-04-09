import { useSelector } from 'react-redux';

export default function useUserAuth(): boolean {
  const user = useSelector((state: any) => state.auth);
  if(user){
    return true; // User is authenticated
  }
  return false; // User is not authenticated
}
// This hook checks if the user is authenticated by accessing the Redux store       