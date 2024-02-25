import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';

const SignOutButton = () => {
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: async () => {
			return axios.post('http://127.0.0.1:3000/sign-out');
		},
		onSuccess: () => {
			navigate({
				to: '/sign-in',
				replace: true,
			});
		},
	});

	return <Button onClick={() => mutation.mutate()}>Sign Out</Button>;
};

export { SignOutButton };
