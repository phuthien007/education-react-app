import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@gluestack-ui/themed';

import {VStack} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';

export const showErrorMessage = (message: string, toast: any) => {
  toast.show({
    placement: 'top',
    render: ({id}: {id: string}) => {
      const toastId = 'toast-' + id;
      return (
        <Toast nativeID={toastId} action="error" variant="accent">
          <VStack space="xs">
            <ToastTitle>Lỗi</ToastTitle>
            <ToastDescription>{message}</ToastDescription>
          </VStack>
        </Toast>
      );
    },
  });
};
export const showSuccessMessage = (message: string, toast: any) => {
  toast.show({
    placement: 'top',
    render: ({id}: {id: string}) => {
      const toastId = 'toast-' + id;
      return (
        <Toast nativeID={toastId} action="success" variant="accent">
          <VStack space="xs">
            <ToastTitle>Thành công</ToastTitle>
            <ToastDescription>{message}</ToastDescription>
          </VStack>
        </Toast>
      );
    },
  });
};
