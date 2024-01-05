import React, {useEffect, useState} from 'react';
import {createProvider} from '@gluestack-ui/provider';
import {StyledProvider} from '@gluestack-style/react';
import {OverlayProvider} from '@gluestack-ui/overlay';
import {ToastProvider} from '@gluestack-ui/toast';
import {config} from '@gluestack-ui/config';
import {Appearance, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Box,
  Button,
  ButtonText,
  StatusBar,
  Switch,
  Text,
  View,
  useToast,
} from '@gluestack-ui/themed';
import {useColorMode, onChange} from '@gluestack-ui/themed';
import ApplicationNavigator from './src/navigators/application';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './stores';
import {showErrorMessage} from './src/utils/formatNotification';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const GluestackUIStyledProvider = createProvider({StyledProvider});

const GluestackUIProvider = ({children, ...props}: any) => {
  return (
    <GluestackUIStyledProvider config={config}>
      <OverlayProvider>
        <ToastProvider>{children}</ToastProvider>
      </OverlayProvider>
    </GluestackUIStyledProvider>
  );
};
function App(): JSX.Element {
  const colorMode = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // height: '100%',
    flex: 1,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <GluestackUIProvider>
          <ApplicationNavigator />
        </GluestackUIProvider>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
