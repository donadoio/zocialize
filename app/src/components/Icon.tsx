import React from 'react';
import {Icon} from 'galio-framework';

const IconExtra = (props: any) => {
  const {name, family, ...rest} = props;
  return <Icon name={name} family={family} {...rest} />;
};

export default IconExtra;
