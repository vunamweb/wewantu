import React, { useState } from "react";
import { StyleSheet } from 'react-native';

import Switch from 'react-native-switch-toggles-2';

export default function MySwitch({ mode, style, ...props }) {
  const [isEnabled, setIsEnabled] = useState(false);

   props.component.switch[props.index] = isEnabled;
  
  return (
    <Switch
        containerStyle={[styles.container, props.container]}
        additionalThumbStyle={[styles.additionalThumb, props.additionalThumb]}
        renderActiveThumbIcon={() =>
          isEnabled ? (
            null
          ) : null
        }
        /*renderInactiveThumbIcon={() =>
          !isEnabled ? <View style={{ height: 30, width: 30, borderRadius: 5, backgroundColor: "#898166" }} /> : null
        }*/
        {...props}
        value={isEnabled}
        onChange={(value) => setIsEnabled(value)}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#898166", borderWidth: 1, borderRadius: 5, height: 28
  },
  additionalThumb: {
    height: 10, width: 25, borderRadius: 5, paddingTop: 20
  }
})
