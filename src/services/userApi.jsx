const BASE_URL = 'https://6992be128f29113acd3e8981.mockapi.io'

export const getUsers = async () => {
    try {
        const data = await fetch(BASE_URL)
        return await data.json()
    } catch (error) {
        console.log("Error in fetching data", error);
        throw error;
    }
}

export const createUser = async (input) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        return response;
    } catch (error) {
        console.log("Error in creating user", error);
        throw error;
    }
}

export const getUserById = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/${userId}`)
        return await response.json();
    } catch (error) {
        console.log("Error in fetching user by ID", error);
        throw error;
    }
}

export const updateUser = async (userId, input) => {
    try {
        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        return response;
    } catch (error) {
        console.log("Error in updating user details", error);
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'DELETE'
        })
        return response;
    } catch (error) {
        console.log("Error in deleting user", error);
        throw error;
    }
}