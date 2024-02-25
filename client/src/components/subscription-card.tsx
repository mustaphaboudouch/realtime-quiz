import { Button, Card, Grid, Text } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { SubscriptionEntity } from '../types';

const SubscriptionCard = ({ _id, questions }: SubscriptionEntity) => {
	return (
		<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
			<Card padding='lg' radius='md' withBorder>
				{/* <Text fw={500} mb='xs' truncate>
					{name}
				</Text> */}
				<Text size='sm' c='dimmed' mb='sm'>
					{`${questions.length} questions`}
				</Text>

				<Button
					leftSection={<IconEye size='1.2rem' />}
					component={Link}
					to={`/subscriptions/${_id}`}
					preload={false}
				>
					View
				</Button>
			</Card>
		</Grid.Col>
	);
};

export { SubscriptionCard };
