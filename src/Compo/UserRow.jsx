/* eslint-disable react/prop-types */
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const UserRow = ({user, idx, setUsers, users}) => {

const {_id, name, email, gender, status} = user ;

const handleDelete = id => {
    // console.log("delete:",id)
    fetch(`https://my-user-management.vercel.app/users/${id}`,{
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        if(data.deletedCount>0){
            Swal.fire({
                title: `${name}`,
                text: ` Your account has been Deleted`,
                icon: "success"
              });
const remaining = users.filter(u => u._id !== id) ;
setUsers(remaining)
        }
    })
}

    return (
                  <tr>
        <th>{idx+1}</th>
        <td>{name}</td>
        <td>{email}</td>
        <td>{gender}</td>
        <td>{status}</td>
        <td className="flex gap-2 justify-center">
<Link to={`/updateUser/${_id}`} className="btn" ><MdEdit  className=" text-xl"/></Link>
<button className="btn font-semibold text-2xl" onClick={() => handleDelete(_id)}>X</button>
        </td>
      </tr>
    );
};

export default UserRow;