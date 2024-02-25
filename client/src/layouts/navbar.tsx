import { Link } from '@tanstack/react-router';
import { Button, Group, Title } from '@mantine/core';
import { SignOutButton } from './sign-out-button';

type NavbarProps = {
	isAuthenticated: boolean;
};

const Navbar = ({ isAuthenticated }: NavbarProps) => {
	return (
		<Group align='center' justify='space-between' h='100%'>
			<Group>
				<Title order={4}>Realtime Quiz</Title>
				{isAuthenticated && (
					<Group gap={0}>
						<Button variant='subtle' component={Link} to='/' preload={false}>
							Dashboard
						</Button>
						<Button
							variant='subtle'
							component={Link}
							to='/quizzes'
							preload={false}
						>
							Quizzes
						</Button>
						<Button
							variant='subtle'
							component={Link}
							to='/sessions'
							preload={false}
						>
							Sessions
						</Button>
					</Group>
				)}
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
