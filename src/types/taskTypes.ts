export interface IAddTask {
    title: string;
    subtitle?: string;
    description?: string;
    deadline?: string;
    completed: boolean;
}

export interface IUpdateTask extends IAddTask {
    _id: string;
}
export interface ITask extends IUpdateTask {
    createdAt: string;
    message: string;
}

export interface ICompleteTask {
    _id: string;
    title: string;
    completed: boolean;
}

export interface IQueryData {
    limit: number;
    page: number;
    tabKey: number;
    sortField: string;
    sortOrder: number;
    search: string;
}

export interface ITaskResponse {
    totalTasksQty: number;
    totalPagesQty: number;
    tasksOnPageQty: number;
    tasks: ITask[];
    message: string;
}

export interface ITaskDeleteResponse {
    status: {
        deletedCount: number;
        acknowledged: boolean;
    };
    message: string;
}

export interface ITaskStatisticResponse {
    totalTasks: number;
    completedTasks: number;
    activeTasks: number;
    overdueTasks: number;
    message: string;
}
