type UserRole = 'ADMIN' | 'CLIENT';

type User = {
	_id: string;
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

type Session = {
	_id: string;
	quizId: {
		_id: string;
		name: string;
	};
	code: string;
	status: 'ACTIVE' | 'EXPIRED';
};

type SubscriptionEntity = {
	_id: string;
	questions: {
		_id: string;
		question: string;
		isAnswered: boolean;
		isCorrect: boolean;
		answers: {
			_id: string;
			answer: string;
			isSelected: boolean;
		}[];
	}[];
};

type Subscription = {
	_id: string;
	question: {
		_id: string;
		question: string;
		isAnswered: boolean;
		answers: {
			_id: string;
			answer: string;
			isSelected: boolean;
		}[];
	};
	hasMoreQuestions: boolean;
};

export type {
	User,
	UserRole,
	Answer,
	Question,
	Quiz,
	Session,
	Subscription,
	SubscriptionEntity,
};
