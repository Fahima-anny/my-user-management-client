
import { useContext } from "react";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthContext/AuthProvider";


const AddUser = () => {

const navigate = useNavigate() ;
const {createUser, setCurrUser, updateInfo, setName} = useContext(AuthContext) ;

const handleSubmit = e => {
    e.preventDefault() ;
    const form = e.target ;
    const name = form.name.value ;
    const email = form.email.value ;
    const pass = form.pass.value ;
    const gender = form.radioGender.value ;
    const status = form.radioStatus.value ;
    // console.log(name, email, gender, status, pass) ;
    const newUser = {name, email, gender, status} ;

    createUser(email, pass)
    .then(res => {
        // console.log(res.user)
 setCurrUser(res?.user)
 updateInfo({displayName: name})
 .then( () => {
    setName(name)

    fetch("https://my-user-management.vercel.app/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(newUser),
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        if(data.insertedId){
            Swal.fire({
                title: `${name}`,
                text: `Congratulation your account has been created`,
                icon: "success"
              });
    form.reset() ;
    navigate("/")
        }
    })
    // console.log("name updated" )
 })
    })
    .catch(er => alert(er))


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
   <h1 className="font-bold text-3xl py-3">New User</h1>
   <p className="text-gray-500">Use the below form to create a new user</p>
   </div>
   <form onSubmit={handleSubmit} className="py-5">

<div className="my-4">
<label htmlFor="">Name</label>
<br />
<input required className="w-full p-3 mt-2 bg-base-200" type="text" name="name" placeholder="Your Name" id="" />
</div>

<div className="my-4">
<label htmlFor="">Email</label>
<br />
<input required className="w-full p-3 mt-2 bg-base-200" type="email" name="email" placeholder="Your Email Address" id="" />
</div>

<div className="my-4">
<label htmlFor="">Password</label>
<br />
<input required className="w-full p-3 mt-2 bg-base-200" type="password" name="pass" placeholder="Your password" id="" />
</div>

<div className="my-5 flex items-center gap-2 text-gray-500 ">
<span className="text-base-content">Gender </span>
<input  type="radio" name="radioGender" className="radio ml-5" value="Male" defaultChecked />
Male
<input  type="radio" name="radioGender" className="radio" value='Female' />
Female
</div>

<div className="my-5 flex items-center gap-2 text-gray-500">
<span className="text-base-content">Status </span>
<input required type="radio" name="radioStatus" className="radio ml-5" value="Active" defaultChecked />
Active
<input type="radio" name="radioStatus" className="radio" value='Inactive' />
Inactive
</div>


<input className="btn btn-secondary text-base-content w-full" type="submit" value="Submit" />
   </form>
</div>

        </div>
    );
};

export default AddUser;