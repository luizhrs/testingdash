import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('./views/Pages/Login/Login'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/login', exact: true, name: 'Login', component: Login },
  /*{ path: '/fichaatendimento1', name: 'Ficha de Atendimento', component: FichaAtendimento1 },
  { path: '/fichaatendimento', name: 'Ficha de Atendimento', component: FichaAtendimento },
  { path: '/cadastroassistido', name: 'Novo Cadastro', component: CadastroAssistido },*/
];

export default routes;
