import React from 'react';
//import {mount} from 'react-mounter';

import { Router , Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';

import root from './root.js';
import App from './containers/app';

export default function (injectDeps) {
    
    const AppContainerCtx = injectDeps(App);
    //const 



    render(

      <Router history={browserHistory}>
        <Route path='/' component={AppContainerCtx}>
        
        </Route>
      </Router>,
    root('root-node')
  );
}

