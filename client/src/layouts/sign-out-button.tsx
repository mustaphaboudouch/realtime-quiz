import { Button } from '@mantine/core';

const SignOutButton = () => {
	function onSignOut() {
		localStorage.removeItem('jwt-token');
		window.location.reload();
	}

	return <Button onClick={onSignOut}>Sign Out</Button>;
};

export { SignOutButton };
