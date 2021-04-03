import React, { FunctionComponent } from 'react'
import { memo } from 'react';
import { TryProps } from './types';

const Try: FunctionComponent<TryProps> = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
