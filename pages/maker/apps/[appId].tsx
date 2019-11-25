import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { useSelector, useDispatch } from 'react-redux';

import { selectMaker, selectCurrentApp } from '@stores/maker/selectors';
import { selectUser } from '@stores/apps/selectors';
import {
  MakerContainer,
  MakerContentBox,
  MakerStickyStatusBox
} from '@components/maker/styled';
import { Page } from '@components/page';
import { MakerNav } from '@containers/maker-nav';
import Head from '@containers/head';
import Maker from '@components/maker';

const LoadingPage = ({ message = 'Loading...' }) => (
  <Page innerPadding={[0]} wrap>
    <Flex>
      <Box width={1}>
        <Type fontSize={5} my={7} textAlign="center">
          {message}
        </Type>
      </Box>
    </Flex>
  </Page>
);

const MakerPortal = () => {
  const dispatch = useDispatch();
  const { user, maker, selectedApp } = useSelector(state => ({
    user: selectUser(state),
    maker: selectMaker(state),
    selectedApp: selectCurrentApp(state)
  }));

  if (maker.loading || !selectedApp) return <LoadingPage />;

  return (
    <Page
      innerPadding={[0]}
      subNav={<MakerNav selectedAppId={selectedApp.id} />}
      wrap
    >
      <Head title={selectedApp.name} />
      <MakerContainer>
        <Type fontSize={3} fontWeight={500} mx={[4, 6]} py={6} px={[20, 0]}>
          App Mining submission
        </Type>
        <Flex flexDirection={['column', 'column', 'row-reverse']}>
          <MakerStickyStatusBox>
            <Maker.Status app={selectedApp} />
          </MakerStickyStatusBox>
          <Box>
            <MakerContentBox>
              <Maker.PaymentDetails
                app={selectedApp}
                user={user}
                accessToken={user.jwt}
                dispatch={dispatch}
              />
            </MakerContentBox>
            <MakerContentBox>
              <Maker.KYC app={selectedApp} user={user} />
            </MakerContentBox>
            <MakerContentBox>
              <Maker.ParticipationAgreement app={selectedApp} user={user} />
            </MakerContentBox>
          </Box>
        </Flex>
      </MakerContainer>
    </Page>
  );
};

export default MakerPortal;
