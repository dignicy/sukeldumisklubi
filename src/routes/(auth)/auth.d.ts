export interface LoginBody {
	email: string;
	password: string;
}

export interface RegistrationBody {
	email: string;
	password: string;
	passwordConfirm: string;
	name?: string;
}

export interface ResetPasswordBody {
	email: string;
}
