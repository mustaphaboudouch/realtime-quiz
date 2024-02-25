type UserRole = 'ADMIN' | 'CLIENT';

type User = {
	id: string;
	username: string;
	role: UserRole;
};

type Answer = {
	_id: string;
	answer: string;
	isCorrect: boolean;
};

type Question = {
	_id: string;
	question: string;
	answers: Answer[];
};

type Quiz = {
	_id: string;
	name: string;
	questions: Question[];
};

export type { User, UserRole, Answer, Question, Quiz };
