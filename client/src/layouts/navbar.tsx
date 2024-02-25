import { Link } from '@tanstack/react-router';
import { Button, Group } from '@mantine/core';
import { SignOutButton } from './sign-out-button';
import { User } from '../types';

type NavbarProps = {
	user: User | null;
};

const Navbar = ({ user }: NavbarProps) => {
	return (
		<Group align='center' justify='space-between' h='100%'>
			<Link to='/'>Quizz App</Link>

			<Group align='center' h='100%'>
				{!!user && (
					<>
						<Button variant='subtle' component={Link} to='/'>
							Dashboard
						</Button>
						<Button variant='subtle' component={Link} to='quizzes'>
							Quizzes
						</Button>
						<SignOutButton />
					</>
				)}
				{!user && (
					<>
						<Button component={Link} to='/sign-in'>
							Sign In
						</Button>
						<Button component={Link} to='/sign-up'>
							Sign Up
						</Button>
					</>
				)}
			</Group>
		</Group>
	);
};

export { Navbar };
