import React from 'react'
import Error from '../Error';
import {useSelector} from 'react-redux';

const Aside = () => {
  const { error } = useSelector(state => state.chat);
  return (
    <aside className="aside">
      {error && <Error error={error}/>}
    </aside>
  )
}

export default Aside
