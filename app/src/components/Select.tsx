import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Block, Text, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Select: React.FC<any> = (props) => {
  const [value, setValue] = useState<number>(1);

  const handleOnSelect = (index:number, valueToSet: number) => {
    const { onSelect } = props;

    setValue(valueToSet);
    onSelect && onSelect(index, valueToSet);
  }

  const { onSelect, style } = props;

  return(
      <ModalDropdown
        style={[styles.qty, style]}
        onSelect={handleOnSelect}
        dropdownStyle={styles.dropdown}
        dropdownTextStyle={{paddingLeft:16, fontSize:12}}
        {...props}>
        <Block flex row middle space="between">
          <Text size={12}>{value}</Text>
          <Icon name="angle-down" size={11} />
        </Block>
      </ModalDropdown>
  );
}

export default Select;

const styles = StyleSheet.create({
  qty: {
    width: 100,
    backgroundColor: '#DCDCDC',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom:9.5,
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  dropdown: {
    marginTop: 8,
    marginLeft: -16,
    width: 100,
  },
});
