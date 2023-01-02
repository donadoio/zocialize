import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {Input} from 'galio-framework';

import Icon from './Icon';
import {appTheme} from '../constants/';

const customInput: React.FC = props => {
  const {shadowless, success, error, primary} = props;

  const inputStyles = [
    styles.input,
    !shadowless,
    success && styles.success,
    error && styles.error,
    primary && styles.primary,
    {...props.style},
  ];

  return (
    <Input
      placeholder="write something here"
      placeholderTextColor={appTheme.COLORS.MUTED}
      style={inputStyles}
      color={appTheme.COLORS.HEADER}
      iconContent={
        <Icon
          size={14}
          color={appTheme.COLORS.ICON}
          name="link"
          family="AntDesign"
        />
      }
      {...props}
    />
  );
};

customInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false,
  primary: false,
};

customInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  primary: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    borderColor: appTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
  },
  success: {
    borderColor: appTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: appTheme.COLORS.INPUT_ERROR,
  },
  primary: {
    borderColor: appTheme.COLORS.PRIMARY,
  },
  shadow: {
    shadowColor: appTheme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 0.5},
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
});

export default customInput;
