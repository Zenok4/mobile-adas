import { api } from '../../libs/api';

type HealthCheckResponse = {
  message: string;
  status: boolean;
};

class HealthCheckService {
  async checkHealth() {
    try {
      const response = await api.get('/test-connection');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      return 'Error connecting to server';
    }
  }
}

export const healthCheckService = new HealthCheckService();
