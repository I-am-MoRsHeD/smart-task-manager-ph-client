"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { IProject, ITask } from "@/types";
import { useState } from "react";
import AddNewTaskModal from "../modules/task/AddNewTaskModal";
import { deleteTask } from "@/app/services/task/deleteTask";
import { toast } from "sonner";
import EditTaskModal from "../modules/task/EditTaskModal";

interface ProjectDetailsCardProps {
    project: IProject;
}

const ProjectDetailsCard = ({ project }: ProjectDetailsCardProps) => {
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
    const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<ITask | null>();

    const handleEdit = (task: ITask) => {
        setOpenEditTaskModal(true);
        setSelectedTask(task);
    };

    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Deleting task....");

        const result = await deleteTask(id);
        if (result.success) {
            toast.success(result.message, { id: toastId });
        } else {
            toast.error(result.message, { id: toastId })
        };
    };

    return (
        <>
            <Card className="p-4 rounded-2xl shadow-md border border-black/10 w-full">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-semibold text-slate-900">
                        {project?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-700">
                        Team: <span className="font-medium">{project?.linkedTeam?.name}</span>
                    </p>
                </CardHeader>

                <CardContent className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Tasks:</h3>

                    {project?.tasks?.length ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {project?.tasks?.map((task) => (
                                <div
                                    key={task?._id}
                                    className="bg-green-200 p-3 rounded-xl border border-black/20 shadow-sm flex flex-col"
                                >
                                    <div className="space-y-2 flex-1">
                                        <p className="font-semibold">{task?.title}</p>
                                        <p className="text-xs text-muted-foreground">{task?.description}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Assigned: <span className="font-semibold">{task?.assignedMember?.name}</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Priority: <span className="font-semibold">{task?.priority || "Low"}</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Status: <span className="font-semibold">{task?.status || "Pending"}</span>
                                        </p>
                                    </div>

                                    <div className="flex flex-row justify-end grow-0">
                                        <div className="flex flex-row gap-2">
                                            <Button
                                                size="sm"
                                                variant="default"
                                                className="bg-blue-400 hover:bg-blue-500"
                                                onClick={() => handleEdit(task)}
                                            >
                                                Edit
                                            </Button>
                                            {/* delete task */}
                                            <AlertDialog>
                                                <AlertDialogTrigger className="bg-red-500 px-2 py-1 rounded-lg text-white">
                                                    Delete
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(task?._id)}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">No tasks available yet.</p>
                    )}
                </CardContent>

                <CardFooter className="w-[30%] mx-auto">
                    <Button
                        className="w-full bg-foreground hover:bg-muted-foreground"
                        onClick={() => setOpenAddTaskModal(true)}
                    >
                        Add New Task
                    </Button>
                </CardFooter>
            </Card>

            {/* add new task modal */}
            <AddNewTaskModal
                open={openAddTaskModal}
                onClose={() => setOpenAddTaskModal(false)}
                projectId={project?._id}
                members={project?.linkedTeam?.members}
            />

            {/* add new task modal */}
            <EditTaskModal
                open={openEditTaskModal}
                onClose={() => setOpenEditTaskModal(false)}
                task={selectedTask as ITask}
                members={project?.linkedTeam?.members}
            />
        </>
    );
};

export default ProjectDetailsCard;
