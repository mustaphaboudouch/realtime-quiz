import { Link } from '@tanstack/react-router';
import { Button, Group, Title } from '@mantine/core';
import { SignOutButton } from './sign-out-button';

type NavbarProps = {
	isAuthenticated: boolean;
	role: 'ADMIN' | 'CLIENT' | null;
};

const Navbar = ({ isAuthenticated, role }: NavbarProps) => {
	return (
		<Group align='center' justify='space-between' h='100%'>
			<Group>
				<Title order={4}>Realtime Quiz</Title>
				<Group gap={0}>
					{isAuthenticated && (
						<Button variant='subtle' component={Link} to='/' preload={false}>
							{role === 'ADMIN' ? 'Quizzes' : 'My Quizzes'}
						</Button>
					)}
					{isAuthenticated && role === 'CLIENT' && (
						<Button
							variant='subtle'
							component={Link}
							to='/sessions/join'
							preload={false}
						>
							Join a session
						</Button>
					)}
					{isAuthenticated && role === 'ADMIN' && (
						<Button
							variant='subtle'
							component={Link}
							to='/sessions'
							preload={false}
						>
							Sessions
						</Button>
					)}
				</Group>
			</Group>

			<Group align='center' h='100%'>
				{isAuthenticated && <SignOutButton />}
				{!isAuthenticated && (
					<>
						<Button component={Link} to='/sign-in' preload={false}>
							Sign In
						</Button>
						<Button component={Link} to='/sign-up' preload={false}>
							Sign Up
						</Button>
					</>
				)}
			</Group>
		</Group>
	);
};

export { Navbar };
