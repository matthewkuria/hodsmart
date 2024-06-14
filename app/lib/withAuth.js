// hooks/withAuth.js
"use client"
import { useRouter } from 'next/navigation';
import useAuth from './useAuth';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const WrappedComponentWithAuth = (props) => {
    const user = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user === null) {
        router.push('/login/signUp'); // Redirect to sign-in page if not authenticated
      }
    }, [user, router]);

    if (user === null) {
      return <h1>Loading...</h1>; // Show loading spinner while checking authentication
    }

     return user ? <WrappedComponent {...props} /> : null;
  };
   return WrappedComponentWithAuth;
};

export default withAuth;
