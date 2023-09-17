import { PaginationTypeRequest, PaginationTypeResponse } from '~/core/api';
import { TaskModel } from '~/entities/Task';

export type GetTasksRequest = PaginationTypeRequest;
export type GetTasksResponse = PaginationTypeResponse<TaskModel>;
