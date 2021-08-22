import React from 'react';
import PrivateComponent from '../containers/PrivateComponent/Private.component';

const Com = ({ user }) => <p>{user.username}</p>;

const index = () => {
  return <PrivateComponent Component={Com} />;
};

export default index;
