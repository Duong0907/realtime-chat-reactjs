import axios from '../services/axios/axios.js';


const getLastReadStatus = async (conversationId) => {
    try {
        const result = await axios.get('/conversations/lastreads/' + conversationId);
        const lastReadStatus = result.data.data;
        return lastReadStatus;
    } catch (error) {
        return null;
    }
}

const getConversationById = async (conversationId) => {
    try {
        const result = await axios.get('/conversations/' + conversationId);
        const conversation = result.data.data;
        return conversation;
    } catch (error) {
        return null;
    }
}

export { getLastReadStatus, getConversationById }