import http from "../../utils/http";

export const enquiryResolvers = {
  Mutation: {
    /**
     * Submit Enquiry.
     *
     * @param _parent
     * @param _args
     * @returns status.
     */
    async sendEnquiry(_parent: any, args: any) {
      const props = {
        email: args.input.email,
        phone: args.input.phone,
        address: args.input.address,
        comment: args.input.comment,
      };
      try {
        const { body } = await http().post('/api/send_enquiry', props);
        if (body.status) {
          return {
            status: body.status,
            message: body.message,
          };
        }
        return body;
        throw new Error('Backend Server Error');
      } catch (error) {
        return {
          status: false,
        };
      }
    },
  },
};
