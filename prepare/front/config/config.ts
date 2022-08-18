// export const backUrl = 'http://api.dev-cafe.site';

export const backUrl = process.env.NODE_ENV === 'production' ? 'http://api.dev-cafe.site' : 'http://localhost:3065';
