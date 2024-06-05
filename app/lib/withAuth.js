// hooks/withAuth.js

import { useRouter } from 'next/router';
import useAuth from './useAuth';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const user = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user === null) {
        router.push('/signIn'); // Redirect to sign-in page if not authenticated
      }
    }, [user, router]);

    if (user === null) {
      return null; // You can return a loading spinner or null while checking authentication
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
