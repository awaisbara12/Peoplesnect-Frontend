import React from 'react';
import PrivateRoutes from '../../../components/auth/routes/PrivateRoutes';
import ApplyJobFeed from '../../../components/jobs/ApplyJobFeed';

const index  = () =>  {
  return (
    <PrivateRoutes>
      <ApplyJobFeed />
    </PrivateRoutes>
  );
};

export default index;