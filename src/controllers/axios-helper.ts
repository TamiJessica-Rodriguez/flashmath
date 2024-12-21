export const getToken = (): string | null => {
    return localStorage.getItem('token'); // Hämta JWT-token från localStorage
};

export const setToken = (token: string): void => {
    localStorage.setItem('token', token); // Spara JWT-token i localStorage
};

export const removeToken = (): void => {
    localStorage.removeItem('token'); // Ta bort JWT-token från localStorage
};

// Testa om token sparas och hämtas korrekt
console.log('Token in localStorage:', getToken());
