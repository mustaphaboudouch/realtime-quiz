import { Link } from '@tanstack/react-router';
import { SignOutButton } from './sign-out-button';

const Navbar = () => {
	return (
		<nav>
			<Link to='/' preload={false}>
				Dashboard
			</Link>
			<Link to='/sign-in' preload={false}>
				Sign In
			</Link>
			<Link to='/sign-up' preload={false}>
				Sign Up
			</Link>
			<SignOutButton />
		</nav>
	);
};

export { Navbar };
