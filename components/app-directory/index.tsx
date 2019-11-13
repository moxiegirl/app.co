import React from 'react';
import Link from 'next/link';
import { Flex, Box, PseudoBox } from '@blockstack/ui';

import { App } from '@models/app';
import { Arrow } from '@components/arrow';
import { AppIcon } from '@components/app-icon';

interface AppDirectoryItemProps {
  app: App;
}

type AppDirectoryItem = React.FC<AppDirectoryItemProps>;

const AppDirectoryItem: AppDirectoryItem = ({ app }) => (
  <Flex>
    <Link href={`/maker/apps/${app.id}`}>
      <PseudoBox
        display="flex"
        width={['320px', '432px']}
        maxWidth={432}
        mb={2}
        height={96}
        borderRadius={6}
        justifyContent="space-between"
        alignItems="center"
        background="#F9F9FC"
        _hover={{ bg: '#F0F0F5' }}
      >
        <AppIcon
          ml={6}
          src={app.imageUrl}
          alt={`Logo of ${app.name}`}
          size={48}
        />
        <Box flex={1} ml={6}>
          {app.name}
        </Box>
        <Box mr={6}>
          <Arrow direction="right" />
        </Box>
      </PseudoBox>
    </Link>
  </Flex>
);

interface AppDirectoryProps {
  apps: App[];
}

export const AppDirectory: React.FC<AppDirectoryProps> = ({ apps }) => (
  <Box my={[2, 2, 6, 12]}>
    {apps.map(app => (
      <AppDirectoryItem app={app} key={app.id} />
    ))}
  </Box>
);
