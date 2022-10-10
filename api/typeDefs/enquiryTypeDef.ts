import { gql } from '@apollo/client';

export const enquiryTypeDefs = gql`
  input EnquiryInput {
    email: String!
    phone: String!
    address: String!
    comment: String!
  }
  type EnquiryPayload {
    status: Boolean!
    message: String
  }
  type Mutation {
    sendEnquiry(input: EnquiryInput!): EnquiryPayload!
  }
`;
