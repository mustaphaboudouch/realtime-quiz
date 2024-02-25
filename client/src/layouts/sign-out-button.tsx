import { Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

const SignOutButton = () => {
	const [_value, _setValue, removeValue] = useLocalStorage({
		key: 'jwt-token',
	});

	function onSignOut() {
		removeValue();
		window.location.reload();
	}

	return <Button onClick={onSignOut}>Sign Out</Button>;
};

export { SignOutButton };
