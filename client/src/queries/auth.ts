import axios from 'axios';
import {
	UseMutationOptions,
	useMutation,
	useQuery,
} from '@tanstack/react-query';

const useSignUpMutation = (props?: UseMutationOptions) => {
	return useMutation({
		mutationFn: async (data: unknown) => {
			return axios.post('http://127.0.0.1:3000/sign-up', data);
		},
		...props,
	});
};

const useSignInMutation = (props?: UseMutationOptions) => {
	return useMutation({
		mutationFn: async (data: unknown) => {
			return axios.post('http://127.0.0.1:3000/sign-in', data);
		},
		...props,
	});
};

const useSignOutMutation = (props?: UseMutationOptions) => {
	return useMutation({
		mutationFn: async () => {
			return axios.post('http://127.0.0.1:3000/sign-out');
		},
		...props,
	});
};

const useGetMeQuery = () =>
	useQuery({
		queryKey: ['clients'],
		queryFn: async () => {
			return axios.post('http://127.0.0.1:3000/me');
		},
		retry: false,
	});

export {
	useSignUpMutation,
	useSignInMutation,
	useSignOutMutation,
	useGetMeQuery,
};
