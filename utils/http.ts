import Axios from 'axios';

const axioClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

const http = (token?:string) => {
  const get = async (url:string, props:any) => {
    const response = await axioClient.get(url, {
      params: props,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const body = response.data;
    return { response, body };
  };

  const post = async (url:string, props:any) => {
    const response = await axioClient
      .post(url, props, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        if (response.data == undefined || response.data == '') {
          response.data = {
            status: false,
            message: 'server error',
          };
        }
        return response;
      })
      .catch((error) => {
        if (error.response && error.response.status == 422) {
          error.response.data.status = false;
          return error.response;
        } else if (error.response) {
          error.response.data = {
            status: false,
            message: 'server error [200]',
          };
          return error.response;
        } else{
          return {
            data: {
              status: false,
              message: 'server error [300]',
            },
          };
        }
      });

    const body = response.data;
    return { response, body };
  };

  return { get, post };
};

export default http;
