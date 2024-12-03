import { IoPersonAdd } from "react-icons/io5";
import { Link, useLoaderData } from "react-router-dom";
import UserRow from "./UserRow";
import { useState } from "react";


const Home = () => {

const allUsers = useLoaderData() ;

const [users, setUsers] = useState(allUsers) ;

    return (
        <div className="space-y-10">

           <div>
           <Link to='/addUser'>
           <button className="flex items-center gap-2 border rounded-lg p-3 "> New User 
            <IoPersonAdd className="text-xl" />
            </button>
           </Link>
           </div>

           <div className="overflow-x-auto">
  <table className="table text-center">
    {/* head */}
    <thead  className="bg-base-200 text-base-content h-16 ">
      <tr className="">
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

      {/* row 1 */}

{users.map((user,idx) => <UserRow key={user._id} users={users} setUsers={setUsers} idx={idx} user={user}></UserRow>)}


    </tbody>
  </table>
</div>

        </div>
    );
};

export default Home;