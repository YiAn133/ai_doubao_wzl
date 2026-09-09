import{
    useParams
}from 'react-router-dom'
import { useState } from 'react';

function UserProfile(){

    // 获取Params:可能不只id，是获取路径上所有动态的路径    :id 或者 :name
    let {id} = useParams();
    console.log(id);
    
    return(
        <>
        <h2>User Profile:{id} </h2>
        </>
    )


}

export default UserProfile;