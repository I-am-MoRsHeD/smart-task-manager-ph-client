'use client';

import { logoutUser } from "@/app/services/auth/logoutUser";
import { Button } from "../ui/button";


const LogoutButton = () => {
    const handleLogout = async () => {
        await logoutUser();
    };

    return (
        <Button variant={"destructive"}
            className="w-full my-1"
            onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;