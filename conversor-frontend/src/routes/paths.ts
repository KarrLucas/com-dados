// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  comoAtuamos: path(ROOTS_DASHBOARD, '/como-atuamos'),
  projetos: path(ROOTS_DASHBOARD, '/projetos'),
  acontece: path(ROOTS_DASHBOARD, '/acontece'),
  promocoes: path(ROOTS_DASHBOARD, '/promocoes'),
  farolNorte: path(ROOTS_DASHBOARD, '/farol-norte'),
};
