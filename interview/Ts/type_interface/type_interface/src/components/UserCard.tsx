import type React from "react";

interface User{
    name:string;
    age:number;
    avatarUrl:string;
}

interface UserCardProps{
    user:User;
    onEdit:(id:number) => void
}


