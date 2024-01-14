import { adminApi } from 'src/redux/api/admin.api';
import { roleApi } from 'src/redux/api/role.api';

export const useRoleAdmin = (selectedRole: 'deal_manager' | 'rm') => {
  const { data: rolesData, isLoading } = roleApi.useRolesQuery();
  const wantedRole = rolesData?.data?.roles?.find((role) => role.name === selectedRole);
  const adminResult = adminApi.useAdminQuery({ rid: wantedRole?.rid }, { skip: !wantedRole });

  return { ...adminResult, isLoading: adminResult.isLoading || isLoading };
};
