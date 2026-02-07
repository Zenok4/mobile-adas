export const ApiUrls = {
  author: {
    roles: {
      list: "/author/roles/list", 
      create: "/author/roles/create", 
      detail: (id: number | string) => `/author/roles/${id}/get`,
      update: (id: number | string) => `/author/roles/${id}/update`,
      delete: (id: number | string) => `/author/roles/${id}/delete`, 
    },
    permissions: {
      list: "/author/permissions/list", 
      
      // Lấy quyền của một role cụ thể
      rolePermissions: (roleId: number | string) =>
        `/author/roles/${roleId}/permissions/list`, 
        
      // Gán quyền cho role
      assignToRole: (roleId: number | string) =>
        `/author/roles/${roleId}/permissions/assign`,
        
      // Xóa quyền khỏi role
      removeFromRole: (roleId: number | string, permId: number | string) =>
        `/author/roles/${roleId}/permissions/${permId}/remove`, 
    },
  },
};