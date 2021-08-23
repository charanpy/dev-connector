const sharedProfileFields = `
    username: String
    jobTitle: String
    jobDescription: String
    skills: String
    website: String
    lovedTechnology: String
`;

const sharedProjectField = `
    title: String!
    description: String
    projectLink: String
    github: String
`;

const sharedLinkField = `
    github: String
    instagram: String

`;

module.exports = {
  sharedLinkField,
  sharedProfileFields,
  sharedProjectField,
};
