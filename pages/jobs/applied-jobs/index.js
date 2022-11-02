import React from 'react';
import PrivateRoutes from '../../../components/auth/routes/PrivateRoutes';
import AppliedJobsFeed from '../../../components/jobs/Applied-Jobs/AppliedJobsFeed';

const index  = () =>  {
  return (
    <PrivateRoutes>
      <AppliedJobsFeed />
    </PrivateRoutes>
  );
};

export default index;