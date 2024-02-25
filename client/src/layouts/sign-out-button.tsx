import { Button } from '@mantine/core';

const SignOutButton = () => {
	function onSignOut() {
		localStorage.removeItem('jwt-token');
		localStorage.removeItem('role');
		window.location.reload();
	}

	return <Button onClick={onSignOut}>Sign Out</Button>;
};

export { SignOutButton };
