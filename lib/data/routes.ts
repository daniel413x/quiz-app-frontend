import quizData from './quiz-data';

const keys = Object.keys(quizData);

export const CATEGORIES_ROUTE = 'categories';
export const QUIZ_ROUTE = 'quiz';
export const RESULTS_ROUTE = 'results';

export const DASHBOARD_ROUTE = 'dashboard';
export const QUIZZES_ROUTE = 'quizzes';
export const DOMAIN_ROUTE = 'domain';
export const CREATE_QUIZ_ROUTE = 'create';
export const CREATE_QUIZ_QUESTION_ROUTE = 'create';
export const CREATE_QUIZ_CATEGORY_ROUTE = 'create';
export const EDIT_QUIZ_CATEGORY_ROUTE = 'edit';
export const EDIT_QUIZ_QUESTION_ROUTE = 'edit';
export const STATS_ROUTE = 'stats';
export const FEEDBACK_ROUTE = 'feedback';
export const SETTINGS_ROUTE = 'settings';
export const QUIZ_API_ROUTE = 'quiz';
export const USER_ROUTE = 'user';
export const QUIZ_INSTANCE_ROUTE = 'quiz-instance';
export const QUIZ_RESULTS_ROUTE = 'quiz-results';
export const QUIZ_QUESTION_API_ROUTE = 'quiz-question';
export const GET_QUIZ_QUESTION_API_ROUTE = 'get-quiz-question';
export const QUIZ_CATEGORY_API_ROUTE = 'quiz-category';
export const AUTH_CALLBACK_ROUTE = 'auth-callback';
export const DOMAIN_ERROR_ROUTE = 'domain-error';
export const DOMAIN_NOT_FOUND_ROUTE = 'domain-not-found';
export const USER_CREATION_FAILED_ROUTE = 'user-creation-failed';
export const USER_ANSWER_ROUTE = 'user-answer';

export const directQuizRoutes = keys.map((k) => quizData[k]);
