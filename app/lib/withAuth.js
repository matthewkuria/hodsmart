// hooks/withAuth.js

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { CirclesWithBar } from 'react-loader-spinner'

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
         // You can return a loading spinner or null while checking authentication
        return (
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
      )
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
