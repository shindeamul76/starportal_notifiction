import axios from 'axios';

export const updateUserConnectionStatus = async (userId: string, status: boolean) => {
    try {
        const response = await axios.put(`http://localhost:5001/api/v1/${userId}`, { connected: status });
    } catch (error: any) {
        console.error('Error updating user connection status:', error.message);
    }
}
