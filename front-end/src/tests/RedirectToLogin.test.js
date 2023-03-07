import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Redirect from '../Pages/RedirectToLogin';

describe('<Redirect />', () => {
  it('Redireciona para /login', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Redirect />
      </Router>,
    );
    expect(history.location.pathname).toEqual('/login');
  });
});
