const serverURL = process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000';

export const Loggin = async (email, password) => {
    console.log(serverURL);
    
    const response = await fetch(serverURL + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    console.log(response);
    
    const data = await response.json();
    const status = response.status;
    return {
        status,
        data,
    };
}