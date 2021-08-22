import { ComponentType, FC } from 'react';
import { useQuery } from '@apollo/client';
import User from '../../graphql/queries/user';
import { UserType } from '../../models/User';

interface User {
  user: UserType;
}
interface Auth {
  Component: ComponentType<User>;
}

const PrivateComponent: FC<Auth> = ({ Component }) => {
  const { data, error, loading } = useQuery(User, {
    fetchPolicy: 'cache-and-network',
  });

  return <>{!loading && <Component user={data.me} />}</>;
};

export default PrivateComponent;
