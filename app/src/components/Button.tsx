import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'galio-framework';

import appTheme from '../constants/Theme';

const customButton: React.FC<any> = props => {
  const {small, shadowless, children, color, style, fontSize, round} = props;

  const colorStyle = color && appTheme.COLORS[color.toUpperCase()];

  const buttonStyles = [
    small && styles.smallButton,
    colorStyle === 'neutral'
      ? {backgroundColor: 'rgba(0,0,0,0)'}
      : color && {backgroundColor: colorStyle},
    round && {borderRadius: appTheme.SIZES.BASE * 2},
    !shadowless && styles.shadow,
    {...style},
  ];

  return (
    <Button
      style={buttonStyles}
      shadowless
      textStyle={{fontSize: fontSize || 12, fontWeight: '700'}}
      {...props}>
      {children}
    </Button>
  );
};

customButton.propTypes = {
  small: PropTypes.bool,
  shadowless: PropTypes.bool,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      'default',
      'primary',
      'info',
      'error',
      'success',
      'warning',
      'simple',
      'neutral',
    ]),
  ]),
};

const styles = StyleSheet.create({
  smallButton: {
    width: 75,
    height: 28,
  },
});

export default customButton;
