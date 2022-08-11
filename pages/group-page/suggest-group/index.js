import React from 'react'
import PrivateRoutes from '../../../components/auth/routes/PrivateRoutes'
import SuggestionsGroupsFeed from '../../../components/group/Suggestions-group/SuggestionsGroupsFeed'

const index = () => {
  return (
    <PrivateRoutes>
    <SuggestionsGroupsFeed />
    </PrivateRoutes>
  )
}

export default index