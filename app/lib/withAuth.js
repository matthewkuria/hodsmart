// hooks/withAuth.js

import { useRouter } from 'next/navigation';
import useAuth from './useAuth';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const WrappedComponentWithAuth = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login'); // Redirect to sign-in page if not authenticated
      }
    }, [user, loading, router]);

    if (loading) {
        return (
          loading
      ) // Show loading spinner while checking authentication
    }

    return <WrappedComponent {...props} />;
  };

  // Set display name for the component
  WrappedComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WrappedComponentWithAuth;
};

export default withAuth;
