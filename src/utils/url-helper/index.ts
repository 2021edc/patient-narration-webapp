const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

// Authentication endpoints
export const api_login_url = () => `${baseUrl}auth/login`;
export const api_login_session_transfer = () =>
  `${baseUrl}auth/session/transfer`;
export const api_logout_url = () => `${baseUrl}auth/logout`;

// Admin endpoints
export const api_admin_get_users = () => `${baseUrl}user_role/list`;
export const api_admin_add_user = () => `${baseUrl}user/register`;
export const api_admin_add_user_role = () => `${baseUrl}user_role/create`;
export const api_admin_update_user_role = () => `${baseUrl}user_role/update`;
export const api_admin_update_user_password = () =>
  `${baseUrl}user/reset/password`;
export const api_admin_activate_user = () => `${baseUrl}user/activate`;
export const api_admin_deactivate_user = () => `${baseUrl}user/deactivate`;
export const api_admin_get_roles_list = () => `${baseUrl}role/list`;

// Narration generation endpoints
export const api_get_request_history = () =>
  `${baseUrl}narration/request_history`;
export const api_narration_process_file = (narrationType: string) =>
  `${baseUrl}narration/sheet_info?narration_type=${narrationType}`;
export const api_narration_generate_narration = ({
  narration_type,
  filter_value,
}: {
  narration_type: string;
  filter_value: string;
}) =>
  `${baseUrl}narration/create?filter_value=${filter_value}&narration_type=${narration_type}`;
export const api_process_pn_get_downloadlink = (narrationId: string) =>
  `${baseUrl}narration/get_narration_file?narration_id=${narrationId}`;

// Request history endpoints

export const api_get_requests_total = () =>
  `${baseUrl}narration/request_history?count=true`;
export const api_get_requests_history = (
  page: number = 1,
  perPage: number = 20
) =>
  `${baseUrl}narration/request_history?page=${page}&per_page=${perPage}&sort=-created_on`;
