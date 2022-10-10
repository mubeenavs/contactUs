import { gql, useApolloClient, useMutation } from '@apollo/client';

export default function useSupportService() {
  const client = useApolloClient();
  const CONTACT_MUTATION_GQL = gql`
  mutation SendEnquiry($email: String!,
    $phone: String!,
    $address: String!,
    $comment: String!
    ) {
    sendEnquiry(input: {
        email: $email,
        phone: $phone,
        address: $address,
        comment: $comment
    }) {
      status
      message
    }
  }
  `;
  const [contactDetailsMutation] = useMutation(CONTACT_MUTATION_GQL);

  /**
   * Method for send contact details to graphQL for Enquiry
   * @param email
   * @param phone
   * @param address
   * @param comment
   * @return Promise<{ status: boolean; message: string }>
   */
  const sendContactDetailsForEnquiry = async function (
    email: string,
    phone: string,
    address: string,
    comment: string,

  ): Promise<{ status: boolean; message: string }> {
    try {
      await client.resetStore();
      const { data } = await contactDetailsMutation({
        variables: {
          email: email,
          phone: phone,
          address: address,
          comment: comment
        },
      });
      return data.sendEnquiry;
    } catch (error) {
      return {
        status: false,
        message: 'Server Error [100]',
      };
    }
  };
  return { sendContactDetailsForEnquiry };
}
