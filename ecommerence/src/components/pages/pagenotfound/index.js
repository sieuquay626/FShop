/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='container error-container'>
      <div className='row notfound'>
        <div className='col-md-12 text-center'>
          <h1 className='big-text'>Oops!</h1>
          <h2 className='small-text'>404 - PAGE NOT FOUND</h2>
        </div>
        <div className='col-md-6  text-center'>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>

          <Link to='/' className='home-page-button  text-center'>
            GOTO HOME PAGE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
