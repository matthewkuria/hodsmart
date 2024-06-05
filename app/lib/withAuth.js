// hooks/withAuth.js

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { BallTriangle } from 'react-loader-spinner'

const withAuth = (WrappedComponent) => {
  return (props) => {
    const user = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user === null) {
        router.push('/login'); // Redirect to sign-in page if not authenticated
      }
    }, [user, router]);

    if (user === null) {
        return (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
      ) // You can return a loading spinner or null while checking authentication
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
