export type TaskState<T = any> = {
  error?: any;
  loading: boolean;
  data?: T;
};
