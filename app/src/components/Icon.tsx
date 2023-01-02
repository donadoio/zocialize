import React from 'react';
import { Icon } from 'galio-framework';

const IconExtra = (props) => {
  const { name, family, ...rest } = props;
  return <Icon name={name} family="MaterialIcons" {...rest} />;
}



export default IconExtra;
