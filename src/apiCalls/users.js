import axios from '../services/axios/axios.js';

const getCurrentUserFromDB = async () => {
    try {
        const result = await axios.get('/users/me');
        const user = result.data.data;
        return user;
    } catch (error) {
        return null;
    }
};

const getAllNewUsersFromDB = async () => {
    try {
        let result = await axios.get('/users/suggestion');
        const users = result.data.data;
        return users;
    } catch (error) {
        return [];
    }
};

const getConversationListFromDB = async () => {
    try {
        let result = await axios.get('/users/conversation-list');
        const users = result.data.data;
        return users;
    } catch (error) {
        return null;
    }
};

const getUserByIdFromDB = async (userId) => {
    try {
        let result = await axios.get('/users/' + userId);
        const user = result.data.data;
        return user;
    } catch (error) {
        return null;
    }
}

export {
    getCurrentUserFromDB,
    getAllNewUsersFromDB,
    getConversationListFromDB,
    getUserByIdFromDB
};
