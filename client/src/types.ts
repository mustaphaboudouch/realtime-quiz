type UserRole = 'ADMIN' | 'CLIENT';

type User = {
	id: string;
	username: string;
	role: UserRole;
};

export type { User, UserRole };
