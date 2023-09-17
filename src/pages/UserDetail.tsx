import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserQuery } from '~/entities/User';
import { Box, Typography } from '~/shared/components';
import { Avatar } from '~/shared/components/Avatar';
import { Button } from '~/shared/components/Button';
import { dayjs } from '~/shared/configs/date';
import { useNavigation } from '~/shared/hooks';

export const UserDetail: FC = () => {
  const { navigate } = useNavigation();
  const params = useParams<{ id: string }>();
  const { data } = useGetUserQuery({ id: Number(params.id) });

  return (
    <Box variant="col_center_left" className="px-3 py-4">
      <Button label="Back" onClick={() => navigate(-1)} className="mb-3" />
      <Box variant="row_center">
        <Avatar avatar={data?.user?.avatar} size={100} className="mr-3" />
        <Typography variant="h1">
          {data?.user?.firstName} {data?.user?.lastName}
        </Typography>
      </Box>
      <Box variant="col_center_left" className="mt-10">
        <Box variant="row_center" className="mb-3">
          <Typography variant="p1" className="mr-3">
            Date of birthday:
          </Typography>
          <Typography variant="p1" className="font-bold">
            {dayjs(data?.user?.dob).format('LLL')}
          </Typography>
        </Box>
        <Box variant="row_center">
          <Typography variant="p1" className="mr-3">
            Location:
          </Typography>
          <Typography variant="p1" className="font-bold">
            {data?.user?.address}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
