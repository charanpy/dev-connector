const { gql } = require('apollo-server-express');
const {
  sharedLinkField,
  sharedProjectField,
  sharedProfileFields,
} = require('../helpers/sharedField');

const profile = gql`

  type SocialLinks {
    ${sharedLinkField}
  }

  type Project {
    ${sharedProjectField}
  }

  type profile {
    user: User
    ${sharedProfileFields}
    socialLinks: SocialLinks
    projects: [Project]
  }
  
  input SocialLinksField {
    ${sharedLinkField}
  }

  input ProjectField {
    ${sharedProjectField}
  }

  input profileFields {
    user:ID
    ${sharedProfileFields}
    socialLinks: SocialLinksField
    projects: ProjectField
  }

  type Query {
    profile:profile
  }
  type Mutation {
    updateProfile(profile:profileFields): profile
  }

`;

module.exports = profile;
