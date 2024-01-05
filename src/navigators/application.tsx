// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Box, Text, View, useToast} from '@gluestack-ui/themed';
import TabNavigation from './tabNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {showErrorMessage} from '../utils/formatNotification';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ApplicationNavigator() {
  const toast = useToast();
  const handleError = (error: any) => {
    // Errors handling
    console.log('error in react-query');
    try {
      const {response} = error;
      console.log('response', response);
      const {data, status} = response;
      if (data) {
        let messageError;
        if (data.title) {
          messageError = data.title;
        } else if (data.errorMessage) {
          messageError = data.errorMessage;
        } else if (data.message) {
          messageError = data.message;
        } else if (data.fieldErrors) {
          messageError = data.fieldErrors[0].message;
        } else {
          messageError = data.title || 'Có lỗi xảy ra';
        }

        if (status === 403) {
          showErrorMessage('Bạn không có quyền truy cập', toast);
          // navigationRef.reset({
          //   index: 0,
          //   routes: [{ name: 'AuthNavigation' }],
          // });
          // dispatch(logout());
          // showErrorMessage('Bạn không có quyền truy cập');
          // navigateAndSimpleReset('AuthNavigation', 1);
          // history.push("/error/403");
        } else if (status === 401) {
          showErrorMessage('Vui lòng đăng nhập lại', toast);
          // navigationRef.reset({
          //   index: 0,
          //   routes: [{ name: 'AuthNavigation' }],
          // });
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: 'Startup' }],
          // });
          // showErrorMessage('');
          // navigateAndSimpleReset('AuthNavigation', 1);
        } else if (status === 400) {
          console.log('400');
          showErrorMessage(messageError, toast);
          // showErrorMessage(messageError, toast);
        } else if (status >= 400 && status <= 410) {
          showErrorMessage(messageError, toast);
          // showErrorMessage(messageError, toast);
        } else if (status !== 200 && status !== 201 && status !== 204) {
          showErrorMessage(messageError, toast);
          // showErrorMessage(messageError);
        }
      }
    } catch (err: any) {
      console.log(error);
      if (error?.message) {
        showErrorMessage(error?.message, toast);
        // showErrorMessage(error?.message);
        return;
      }
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error: any) => {
          handleError(error);
          // Toast.removeAll();
        },
      },
      queries: {
        enabled: false,
        // @ts-ignore
        onError: (error: any) => {
          handleError(error);
        },
        retry: (failureCount: number, error: any) => {
          const {status} = error.response;
          if (status === 401 || status === 403) {
            return false;
          }
          return failureCount <= 3;
        },
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabNavigation"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default ApplicationNavigator;
