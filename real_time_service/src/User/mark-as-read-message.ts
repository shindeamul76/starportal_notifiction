import axios from 'axios';

export const markAsReadMessage = async (notificationId: string) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/v1/notifications/${notificationId}`);
    } catch (error: any) {
        console.error('Error updating user connection status:', error.message);
    }
}
