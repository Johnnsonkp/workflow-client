export interface Task {
    id?: number;
    title: string;
    description: string;
    status: string;
    time_to_start: string;
    start_date?: string;
    time_to_complete?: string;
    time_to_finish?: string;
    order: number;
    project?: string;
    number?: string
}

export interface DateObj {
    day: string;
    date: number;
    month: string;
    year: number;
    full_date?: string | undefined;
    task?: Task[] | undefined;
}

export interface DateObj {
    day: string;
    date: number;
    month: string;
    year: number;
    full_date?: string | undefined;
    task?: Task[] | undefined;
 }