import { gql } from '@apollo/client';

const User = gql`
  query user {
    me {
      username
      _id
      google
    }
  }
`;

export default User;
