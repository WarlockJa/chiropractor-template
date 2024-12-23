export const LOG_CODES = {
  information: {
    database_record_read: 1001,
    database_record_write: 1002,
    database_record_create: 1003,
    database_record_delete: 1004,
    storage_object_read: 1005,
    storage_object_write: 1006,
    storage_object_create: 1007,
    storage_object_delete: 1008,
    image_optimisation_use: 1009,
  },
  warning: {
    storage_limit_close: 2001,
    databse_limit_close: 2002,
  },
  error: {
    database_operation_fail: 3001,
    storage_operation_fail: 3002,
    image_optimisation_fail: 3003,
  },
  security: {
    user_login: 4001,
    user_logout: 4002,
    user_created: 4003,
    user_data_updated: 4004,
    user_role_updated: 4005,
    user_deleted: 4006,
    authorised_access: 4007,
    unauthorised_access: 4008,
  },
};
