import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import { Button, Block, Text, theme, Input } from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Images, materialTheme, products } from '../constants';
import { Product, Select, Switch } from '../components';
import Header from '../components/Header';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const Components: React.FC<any> = (props) => {
  const [switch1, setSwitch1] = useState<boolean>(true);
  const [switch2, setSwitch2] = useState<boolean>(false);
  const toggleSwitch = (switchId: number) => {
    if (switchId === 1) setSwitch1(!switch1);
    if (switchId === 2) setSwitch2(!switch2);
  };

  const renderButtons = () => {
    return (
      <Block flex>
        <Text bold size={16} style={styles.title}>Buttons</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block center>
            <Button shadowless color={materialTheme.COLORS.DEFAULT} style={[styles.button, styles.shadow]}>
              DEFAULT
            </Button>
          </Block>
          <Block center>
            <Button shadowless style={[styles.button, styles.shadow]}>
              PRIMARY
            </Button>
          </Block>
          <Block center>
            <Button shadowless color="info" style={[styles.button, styles.shadow]}>
              INFO
            </Button>
          </Block>
          <Block center>
            <Button shadowless color="success" style={[styles.button, styles.shadow]}>
              SUCCESS
            </Button>
          </Block>
          <Block center>
            <Button shadowless color="warning" style={[styles.button, styles.shadow]}>
              WARNING
            </Button>
          </Block>
          <Block center>
            <Button shadowless color="danger" style={[styles.button, styles.shadow]}>
              ERROR
            </Button>
          </Block>
          <Block row space="evenly">
            <Block flex left style={{marginTop: 8}}>
              <Select
                defaultIndex={1}
                options={[1, 2, 3, 4, 5]}
                style={styles.shadow}
              />
            </Block>
            <Block flex center>
              <Button
                center
                shadowless
                color={materialTheme.COLORS.DEFAULT}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}>
                DELETE
              </Button>
            </Block>
            <Block flex={1.25} right>
              <Button
                center
                shadowless
                color={materialTheme.COLORS.DEFAULT}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}>
                SAVE FOR LATER
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    )
  }
  
  
  const renderText = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Typography</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text h1 style={{marginBottom: theme.SIZES.BASE / 2}}>Heading 1</Text>
          <Text h2 style={{marginBottom: theme.SIZES.BASE / 2}}>Heading 2</Text>
          <Text h3 style={{marginBottom: theme.SIZES.BASE / 2}}>Heading 3</Text>
          <Text h4 style={{marginBottom: theme.SIZES.BASE / 2}}>Heading 4</Text>
          <Text h5 style={{marginBottom: theme.SIZES.BASE / 2}}>Heading 5</Text>
          <Text p style={{marginBottom: theme.SIZES.BASE / 2}}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
        </Block>
      </Block>
    )
  }
  
  const renderInputs = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Inputs</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            right
            placeholder="icon right"
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
            iconContent={<Icon size={16} color={theme.COLORS.ICON} name="camera" />}
          />
        </Block>
      </Block>
    )
  }
  
  const renderSwitches = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Switches</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row middle space="between" style={{ marginBottom: theme.SIZES.BASE }}>
            <Text size={14}>Switch is ON</Text>
            <Switch
              value={switch1}
              onValueChange={() => { toggleSwitch(1) }}
            />
          </Block>
          <Block row middle space="between">
            <Text size={14}>Switch is OFF</Text>
            <Switch
              value={switch2}
              onValueChange={() => { toggleSwitch(2) }}
            />
          </Block>
        </Block>
      </Block>
    )
  }
    
  
  const renderTableCell = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Table Cell</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => { console.log("buggy"); }}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text size={14}>Manage Options</Text>
                <Icon name="chevron-right" style={{ paddingRight: 5 }} />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    )
  }
  
  const renderNavigation = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Navigation</Text>
        <Block>
          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header back title="Title" navigation={props.navigation} />
          </Block>

          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header search title="Title" navigation={props.navigation} />
          </Block>

          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header
              tabs
              search
              title="Title"
              tabTitleLeft="Option 1"
              tabTitleRight="Option 2"
              navigation={props.navigation} />
          </Block>
        </Block>
      </Block>
    )
  }
  

  const renderSocial = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Social</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row center space="between">
            <Block flex middle right>
              <Button
                round
                onlyIcon
                shadowless
                icon="facebook"
                iconFamily="MaterialIcons"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.FACEBOOK}
                style={[styles.social, styles.shadow]}
              />
            </Block>
            <Block flex middle center>
              <Button
                round
                onlyIcon
                shadowless
                icon="sc-linkedin"
                iconFamily="EvilIcons"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.TWITTER}
                style={[styles.social, styles.shadow]}
              />
            </Block>
            <Block flex middle left>
              <Button
                round
                onlyIcon
                shadowless
                icon="sc-twitter"
                iconFamily="EvilIcons"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.DRIBBBLE}
                style={[styles.social, styles.shadow]}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    )
  }
  
  const renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Cards</Text>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Product product={products[0]} horizontal />
            <Block flex row>
              <Product product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
              <Product product={products[2]} />
            </Block>
            <Product product={products[3]} horizontal />
            <Product product={products[4]} full />
            <Block flex card shadow style={styles.category}>
              <ImageBackground
                source={{ uri: Images.Products['Accessories'] }}
                style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 252 }]}
                imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 252 }}>
                <Block style={styles.categoryTitle}>
                  <Text size={18} bold color={theme.COLORS.WHITE}>Accessories</Text>
                </Block>
              </ImageBackground>
            </Block>
          </Block>
        </Block>
      </Block>
    )
  }
  

  const renderAlbum = () => {
    const { navigation } = props;

    return (
      <Block flex style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}>
        <Text bold size={16} style={styles.title}>Album</Text>
        <Block style={{ marginHorizontal: theme.SIZES.BASE * 2 }}>
          <Block flex right>
            <Text
              size={12}
              color={theme.COLORS.PRIMARY}
              onPress={() => navigation.navigate('Home')}>
              View All
            </Text>
          </Block>
          <Block row space="between" style={{ marginTop: theme.SIZES.BASE, flexWrap: 'wrap' }} >
            {Images.Viewed.map((img, index) => (
              <Block key={`viewed-${img}`} style={styles.shadow}>
                <Image
                  resizeMode="cover"
                  source={{ uri: img }}
                  style={styles.albumThumb}
                />
              </Block>
            ))}
          </Block>
        </Block>
      </Block>
    )
  }

  

  return (
    <Block flex center>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}>
            {renderButtons()}
            {renderText()}
            {renderInputs()}
            {renderSwitches()}
            {renderTableCell()}
            {renderNavigation()}
            {renderSocial()}
            {renderCards()}
            {renderAlbum()}
        </ScrollView>
      </Block>
  );
}

export default Components;


const styles = StyleSheet.create({
  components: {
    width: width
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - (theme.SIZES.BASE * 2),
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
});
