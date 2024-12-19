export const getToken = (): string | null => {
    return localStorage.getItem('token'); // Hämtar JWT-token från localStorage
};

export const setToken = (token: string): void => {
    localStorage.setItem('token', token); // Sparar JWT-token i localStorage
};

export const removeToken = (): void => {
    localStorage.removeItem('token'); // Tar bort JWT-token från localStorage
};
