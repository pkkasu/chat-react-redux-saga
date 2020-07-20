import React from 'react'
import Error from '../Error';
import {useSelector} from 'react-redux';

const Aside = () => {
  const { error } = useSelector(state => state.chat);
  return (
    <aside className="aside">
      {error.map((item, index) => (
        <Error key={index}/>
      ))}
    </aside>
  )
}

export default Aside
