import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useCreateUserMutation, UserModel } from '~/entities/User';
import { Input, Typography } from '~/shared/components';
import { Button } from '~/shared/components/Button';
import { Modal, ModalProps } from '~/shared/components/Modals';

interface SuccessModalProps extends Pick<ModalProps, 'visible' | 'toggleVisible'> {
  text?: string;
  subTitle?: string;
  subTitle2?: string;
  label?: string;
  onClick?: () => void;
}

export const UserModal: FC<SuccessModalProps> = ({ visible, toggleVisible }) => {
  const { handleSubmit, control } = useForm<UserModel>({});
  const [create] = useCreateUserMutation();

  const submit = (values: UserModel) => {
    create(values).then(toggleVisible);
  };

  return (
    <Modal {...{ visible, toggleVisible }} className="w-full max-w-[28.75rem]">
      <Typography variant="h3" className="block mb-3">
        User create
      </Typography>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { value, onChange } }) => (
          <Input<false>
            value={value || ''}
            placeholder="User First Name"
            className="mb-5"
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field: { value, onChange } }) => (
          <Input<false>
            value={value || ''}
            placeholder="User Last Name"
            className="mb-5"
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <Input<false>
            value={value || ''}
            placeholder="User Email"
            className="mb-5"
            onChange={onChange}
          />
        )}
      />
      <Button label="Save" className="w-full" onClick={handleSubmit(submit)} />
    </Modal>
  );
};
