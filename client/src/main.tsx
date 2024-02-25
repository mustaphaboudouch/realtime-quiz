import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Router } from './router.tsx';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider>
			<Notifications position='top-right' />
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</MantineProvider>
	</React.StrictMode>,
);
