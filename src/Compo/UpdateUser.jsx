import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateUser = () => {

const user = useLoaderData() ;
const {_id, name, email, gender, status} = user ;
const navigate = useNavigate() ;

const handleUpdate = e => {
    e.preventDefault() ;
    const form = e.target ;
    const name = form.name.value ;
    const email = form.email.value ;
    const gender = form.radioGender.value ;
    const status = form.radioStatus.value ;
    // console.log(name, email, gender, status) ;
    const updatedUser = {name, email, gender, status} ;

fetch(`https://my-user-management.vercel.app/users/${_id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(updatedUser),
})
.then(res => res.json())
.then(data => {
    // console.log(data)
    if(data.matchedCount){
        Swal.fire({
            title: `${name}`,
            text: `Your account has been Updated`,
            icon: "success"
          });
form.reset() ;
navigate("/")
    }

})
}

    return (
        <div>
            <Link to='/'>
           <button className="flex items-center gap-1">
            <RiArrowLeftDoubleLine className="text-2xl" />
            All Users
            </button>
           </Link>

<div>
   <div className="text-center">
   <h1 className="font-bold text-3xl py-3">Update User : {name}</h1>
   <p className="text-gray-500">Use the below form to update a user</p>
   </div>
   <form onSubmit={handleUpdate} className="py-5">

<div className="my-4">
<label htmlFor="">Name</label>
<br />
<input required className="w-full p-3 mt-2 bg-base-200" defaultValue={name} type="text" name="name" placeholder="Your Name" id="" />
</div>

<div className="my-4">
<label htmlFor="">Email</label>
<br />
<input required defaultValue={email} className="w-full p-3 mt-2 bg-base-200" type="email" name="email" placeholder="Your Email Address" id="" />
</div>

<div className="my-5 flex items-center gap-2 text-gray-500 ">
<span className="text-base-content">Gender </span>
<input  type="radio"
 name="radioGender" 
 className="radio ml-5"
  value="Male"
  defaultChecked={gender === "Male" ? true : false}
 />
Male
<input  type="radio"  defaultChecked={gender === "Female" ? true : false} name="radioGender" className="radio" value='Female' />
Female
</div>

<div className="my-5 flex items-center gap-2 text-gray-500">
<span className="text-base-content">Status </span>
<input
 required 
 type="radio" 
 name="radioStatus" 
 className="radio ml-5" 
 value="Active" 
 defaultChecked={status=== "Active"} />
Active
<input 
type="radio" 
name="radioStatus" 
className="radio" 
value='Inactive' 
defaultChecked={status=== "Inactive"}
/>
Inactive
</div>


<input className="btn btn-secondary text-base-content w-full" type="submit" value="Submit" />
   </form>
</div>

        </div>
    );
};

export default UpdateUser;