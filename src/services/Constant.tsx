export const BASE_URL = "http://localhost:5000/";

export const Login_END_POINT = "user/login";

export const POST = "post";
export const GET = "get";
export const PUT = "put";
export const DELETE = "delete";

export const header = {
  "Content-Type": "application/json",
};

export const userLoginEndPoint = () => {
  return BASE_URL + Login_END_POINT;
};
