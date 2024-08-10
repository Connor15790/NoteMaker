import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            console.log(localStorage.getItem("token"))
            navigate("/")
            props.showAlert("Account Created Successfully", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <div className='container my-2'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control my-2" id="name" value={credentials.name} onChange={onChange} name='name' aria-describedby="nameHelp" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control my-2" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp" placeholder="Enter email (Real email not required in demo)" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control my-2" id="password" value={credentials.password} onChange={onChange} name='password' placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" className="form-control my-2" id="cpassword" value={credentials.cpassword} onChange={onChange} name='cpassword' placeholder="Confirm Password" />
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;