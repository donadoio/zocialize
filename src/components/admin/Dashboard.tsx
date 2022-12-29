import { Backdrop, AppBar, IconButton, Icon, ListItem } from "@react-native-material/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../redux/slices/screenSlice";

const Dashboard: React.FC<{navigation: any }> = () => {
    const [revealed, setRevealed] = useState(false);
    const dispatch = useDispatch();
    return (
      <Backdrop
        revealed={revealed}
        header={
          <AppBar
            title="Screen title"
            transparent
            leading={props => (
              <IconButton
                icon={props => (
                  <Icon name={revealed ? "close" : "menu"} {...props} />
                )}
                onPress={() => setRevealed(prevState => !prevState)}
                {...props}
              />
            )}
          />
        }
        backLayer={
          <>
              <ListItem
                title="Dashboard"
                leading={<Icon name="home" size={24} />}
              />
              <ListItem
                title="Users"
                leading={<Icon name="person" size={24} />}
              />
              <ListItem
                title="Availability"
                leading={<Icon name="event" size={24} />}
              />
              <ListItem
                title="Settings"
                leading={<Icon name="settings" size={24} />}
                onPress={()=>{
                  dispatch(setScreen('Settings'))
                }}
              />
          </>
        }
      >
      </Backdrop>
    );
  };
  
  
  export default Dashboard;