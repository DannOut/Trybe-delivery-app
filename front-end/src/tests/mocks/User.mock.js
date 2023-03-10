const name = 'Cliente Zé Birita';
const email = 'zebirita@email.com';
const role = 'customer';
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWw
  iOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9
  tZXIiLCJpYXQiOjE2NzgzMTAxMjh9.sVyYHdZT2LWTgRcGph
  Ln6L1Wx1X6trlMxmNIAcB2tno`;

const mockToken = {
  name,
  email,
  role,
  token,
};

const infoSentAxiosPost = {
  name,
  email,
  role,
  password: '$#zebirita#$',
  token,
};

export { infoSentAxiosPost, mockToken, token };
