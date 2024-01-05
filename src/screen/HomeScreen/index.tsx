import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../stores';
import {
  selectCommonState,
  setLoading,
} from '../../../stores/slices/CommonSlice';
import {
  Button,
  ButtonGroup,
  ButtonSpinner,
  ButtonText,
  ScrollView,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../utils/formatNotification';

const HomeScreen = () => {
  const {loading} = useAppSelector(selectCommonState);
  const dispatch = useAppDispatch();
  const handleLoading = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      console.log('setLoading false');
      dispatch(setLoading(false));
    }, 5000);
  };
  return (
    <ScrollView>
      <Text>Home Screen</Text>
      <ButtonGroup justifyContent="center">
        <Button
          size="lg"
          w={'$5/6'}
          $active-bgColor="$blue300"
          onPress={() => handleLoading()}>
          <ButtonSpinner mr={'$0.5'} display={loading ? 'flex' : 'none'} />
          <ButtonText> Click me</ButtonText>
        </Button>
      </ButtonGroup>
    </ScrollView>
  );
};

export default HomeScreen;
