import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../constansts';

const NotFound = () => {
 

  return (
    <div className='container'>
      <div className='center-div'>
      <h2 className='center'>NotFound</h2>
      <Link to={PATH.HOME} className='center'>Go gome</Link>
      </div>
      
    </div>
  );
};

export default NotFound;
