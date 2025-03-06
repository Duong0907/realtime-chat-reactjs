import axios from '../services/axios/axios.js';


const getLastReadStatus = async (conversatonId) => {
    try {
        const result = await axios.get('/conversations/lastreads/' + conversatonId);
        const lastReadStatus = result.data.data;
        return lastReadStatus;
    } catch (error) {
        return null;
    }
}

export { getLastReadStatus }