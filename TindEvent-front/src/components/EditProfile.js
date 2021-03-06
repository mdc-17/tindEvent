import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom"
import { withAuth } from "../lib/AuthProvider";
import service from '../api/services'


function EditProfile(props) {
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [location, setLocation] = useState(props.user.location);
  const [bio, setBio] = useState(props.user.bio);
  const [picture, setPicture] = useState(props.user.picture);
  const [birthDate, setBirthDate] = useState(props.user.birthDate);
  
  const getUserInfo = async () => {
    const me = await axios.get(`${process.env.REACT_APP_API_URI}/profile/${props.user._id}`);
    setUsername(me.data.username)
    setEmail(me.data.email)
    setLocation(me.data.location)
    setBio(me.data.bio)
    setBirthDate(me.data.birthDate)
    setPicture(me.data.picture)  
  }
 
  useEffect( () => {
    getUserInfo()
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    // this method handles just the file upload
     function handleFileUpload (e) {
      const uploadData = new FormData();
      uploadData.append("picture", e.target.files[0]);
      service
        .handleUpload(uploadData)
        .then((response) => {
          setPicture(response.secure_url);
        })
        .catch((err) => {
          console.log("Error while uploading the file: ", err);
        });
    };
    
    const history = useHistory();
  
  async function handleFormSubmit (event){
    event.preventDefault();
    try{
      await axios.put(`${process.env.REACT_APP_API_URI}/profile/${props.user._id}/edit`, { picture , username, email, location, birthDate, bio })
      history.push("/Profile")
      ;
    }
    catch(error){
      console.log(error)
    }
  }

  
  return (
        <div>
      <div className ="profile">
        <form className="profileCard" onSubmit={e => handleFormSubmit(e)}>
          
        <label>Photo:</label>
        <input 
        type='file' 
        name="picture"
        onChange={e => handleFileUpload(e)} 
        />
          <br></br>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <br></br>
          <label>Email:</label>
          <input
          type="text"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br></br>
          <label>Location:</label>
          <input
          type="text"
            name="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <br></br>
          <label>Birthdate:</label>
          <input
          type="Date"
            name="birthDate" 
            value={birthDate}
            onChange={e =>setBirthDate(e.target.value)}
          />
          <br></br>
          <label>Bio:</label>
          <textarea
          type="text"
            name="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
          <br></br>

          <button type="submit" value="Submit">Edit</button>
        </form>
      </div>
      </div>
    )
}
export default withAuth(EditProfile)