import { createRoute } from '@tanstack/react-router';
import { AuthLayoutRoute } from '../layouts/auth-layout';

const SignUp = () => {
	return (
		<div>
			<h1>Sign Up</h1>
		</div>
	);
};

const SignUpRoute = createRoute({
	path: '/sign-up',
	getParentRoute: () => AuthLayoutRoute,
	component: SignUp,
});

export { SignUpRoute };
