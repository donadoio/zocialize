import React from 'react';
import {Switch, Platform} from 'react-native';

import appTheme from '../constants/Theme';

const customSwitch = (props: any) => {
  const {value} = props;
  const thumbColor =
    Platform.OS === 'ios'
      ? appTheme.COLORS.PRIMARY
      : Platform.OS === 'android' && value
      ? appTheme.COLORS.SWITCH_ON
      : appTheme.COLORS.SWITCH_OFF;

  return (
    <Switch
      value={value}
      thumbColor={[value === true ? appTheme.COLORS.SWITCH_ON : '#ffffff']}
      ios_backgroundColor={'#D8D8D8'}
      trackColor={{
        true: '#d3d3d3',
        false: Platform.OS == 'ios' ? '#d3d3d3' : '#333',
      }}
      {...props}
    />
  );
};

export default customSwitch;
