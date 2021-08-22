import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { errorVar } from '../../lib/apollo-client';

const Alert = () => {
  const error = useReactiveVar(errorVar);
  console.log(error);

  return <div>{error && error}</div>;
};

export default Alert;
