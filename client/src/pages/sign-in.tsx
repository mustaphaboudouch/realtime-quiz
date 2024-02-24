import { createRoute } from '@tanstack/react-router';
import { AuthLayoutRoute } from '../layouts/auth-layout';

const SignIn = () => {
	return (
		<div>
			<h1>Sign In</h1>
		</div>
	);
};

const SignInRoute = createRoute({
	path: '/sign-in',
	getParentRoute: () => AuthLayoutRoute,
	component: SignIn,
});

export { SignInRoute };
