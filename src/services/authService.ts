import { api } from '../libs/api'; 
import { ApiUrls } from '../types/apiUrls';

// --- TYPES ---
export interface Role {
  id: number;
  name: string;
  description: string;
  level: number;
  is_active: boolean;
  created_at: string;
}
// Param filter danh sách role 
export interface ListRolesParams {
  page?: number;
  limit?: number;
  name?: string;
  description?: string;
  is_active?: boolean | null;
  list_permissions?: boolean;
}

// Payload khi tạo/sửa role 
export interface RolePayload {
  name: string;
  description?: string;
  is_active?: boolean;
  level?: number;
  current_user_level?: number;
}

// --- LOGIC SERVICE ---
export const authService = {
  // 1. Lấy danh sách Roles 
  listRoles: async (params: ListRolesParams = {}) => {
    try {
      const apiParams = { 
        ...params, 
        limit: params.limit || 10, 
        list_permissions: true 
      };
      
      const response = await api.get(ApiUrls.author.roles.list, { params: apiParams });
      const dataContainer = response.data?.data;
      
      return {
        roles: Array.isArray(dataContainer?.roles) ? dataContainer.roles : [],
        total: dataContainer?.total || 0 
      };
    } catch (error) {
      console.error("Lỗi listRoles:", error);
      throw error;
    }
  },

  // 2. Tạo, Cập nhật, Xoá Role
  createRole: async (data: RolePayload) => {
    const response = await api.post(ApiUrls.author.roles.create, data);
    return response.data;
  },

  updateRole: async (id: number, data: RolePayload) => {
    const response = await api.put(ApiUrls.author.roles.update(id), data);
    return response.data;
  },

  deleteRole: async (id: number, currentUserLevel: number = 99) => {
    const response = await api.delete(ApiUrls.author.roles.delete(id), {
      params: { current_user_level: currentUserLevel }
    });
    return response.data;
  },
  
  // Permissions
  listPermissions: async () => {
    const response = await api.get(ApiUrls.author.permissions.list);
    return response.data?.data?.permissions || response.data?.permissions || [];
  },

  assignPermissionToRole: async (roleId: number, permIds: number[]) => {
    const response = await api.post(
      ApiUrls.author.permissions.assignToRole(roleId),
      { perm_ids: permIds }
    );
    return response.data;
  },

  getRole: async (id: number, includePermissions: boolean = true) => {
    const response = await api.get(ApiUrls.author.roles.detail(id), {
      params: { list_permissions: includePermissions },
    });
    return response.data;
  }
};