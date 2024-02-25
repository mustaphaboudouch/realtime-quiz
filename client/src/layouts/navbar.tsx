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
			<Link to='/' preload={false}>
				Quizz App
			</Link>

			<Group align='center' h='100%'>
				{!!user && (
					<>
						<Button variant='subtle' component={Link} to='/' preload={false}>
							Dashboard
						</Button>
						<Button
							variant='subtle'
							component={Link}
							to='quizzes'
							preload={false}
						>
							Quizzes
						</Button>
						<SignOutButton />
					</>
				)}
				{!user && (
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
