import { api } from "../libs/api";
import { ApiUrls } from "../types/apiUrls";
import { TripListItem } from "../types/index";


export const tripService = {
  // Lấy danh sách hành trình của người dùng
  getTripList: async (userId?: string): Promise<TripListItem[]> => {
    try {
      if (!userId) return [];

      const response = await api.get(ApiUrls.trip.list, {
        params: { user_id: userId },
      });

      // Chuyển đổi từ API response sang TripListItem
      return response.data.data.map((item: any) => ({
        id: item.id,
        date: new Date(item.start_time).getDate().toString(),
        month: new Date(item.start_time).toLocaleDateString('vi-VN', {
          month: 'short',
        }),
        vehicle: item.vehicle_name || 'Không xác định',
        route: item.route || 'Không xác định',
        duration: formatDuration(item.duration || 0),
        totalWarnings: item.warnings_count || 0,
        stats: {
          drowsy: item.drowsy_count || 0,
          obstacle: item.obstacle_count || 0,
          sign: item.sign_count || 0,
          lane: item.lane_count || 0,
        },
      }));
    } catch (error) {
      console.error('Lỗi lấy danh sách hành trình:', error);
      return [];
    }
  },

  // Lấy chi tiết hành trình
  getTripDetail: async (tripId: string) => {
    try {
      const response = await api.get(`${ApiUrls.trip.list}${tripId}`);
      return response.data.data;
    } catch (error) {
      console.error('Lỗi lấy chi tiết hành trình:', error);
      return null;
    }
  },

  // Lấy tóm tắt hành trình
  getTripSummary: async (userId?: string) => {
    try {
      if (!userId) return null;

      const response = await api.get(ApiUrls.trip.summary, {
        params: { user_id: userId },
      });
      return response.data.data;
    } catch (error) {
      console.error('Lỗi lấy tóm tắt hành trình:', error);
      return null;
    }
  },
};

// Hàm helper để format thời lượng
function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}p`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}p` : `${hours}h`;
}
