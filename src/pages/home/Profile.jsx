import React, { useEffect, useState } from 'react';
import Header from '../../components/topbar/Header';
import Leftbar from '../../components/leftbar/Leftbar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState({});
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newCoverPicture, setNewCoverPicture] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const PF = "https://social-7tc4.onrender.com/images/";
  const AF = "https://social-7tc4.onrender.com/images/";

  const handleProfilePictureChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
    setShowProfileModal(true);
  };

  const handleCoverPictureChange = (e) => {
    setNewCoverPicture(e.target.files[0]);
    setShowCoverModal(true);
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    const newpost = {
      userId: user._id,
    };

    if (newProfilePicture) {
      const data = new FormData();
      const filename = newProfilePicture.name;
      data.append("file", newProfilePicture);
      data.append("name", filename);
      newpost.profilePicture = filename;

      try {
        await axios.post("https://social-7tc4.onrender.com/api/uploadprofile", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.put(`https://social-7tc4.onrender.com/api/users/${user._id}`, newpost);
      setUser(prevUser => ({ ...prevUser, profilePicture: newpost.profilePicture }));
    } catch (err) {
      console.log(err);
    }
    setShowProfileModal(false);
  };

  const handleSubmitCover = async (e) => {
    e.preventDefault();
    const newpost = {
      userId: user._id,
    };

    if (newCoverPicture) {
      const data = new FormData();
      const filename = newCoverPicture.name;
      data.append("file", newCoverPicture);
      data.append("name", filename);
      newpost.coverPicture = filename;

      try {
        await axios.post("https://social-7tc4.onrender.com/api/uploadcover", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.put(`https://social-7tc4.onrender.com/api/users/${user._id}`, newpost);
      setUser(prevUser => ({ ...prevUser, coverPicture: newpost.coverPicture }));
    } catch (err) {
      console.log(err);
    }
    setShowCoverModal(false);
  };

  useEffect(() => {
    axios.get(`https://social-7tc4.onrender.com/api/users?username=${username}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [username]);

  return (
    <>
      <Header />
      <div className='flex'>
        <Leftbar />
        <div className='flex-[9]'>
          <div id="profiletop">
            <div className='h-80 relative'>
              <img
                src={user.coverPicture ? PF + user.coverPicture : "default_cover_picture_url"}
                className='w-full h-64 object-cover cursor-pointer'
                onClick={() => document.getElementById('coverPictureInput').click()}
              />
              <input
                type="file"
                id="coverPictureInput"
                style={{ display: 'none' }}
                onChange={handleCoverPictureChange}
              />
              {showCoverModal && (
                <div className="modal">
                  {/* Modal content for cover picture selection */}
                  <button onClick={handleSubmitCover}>Save Cover Picture</button>
                </div>
              )}
              <img
                src={user.profilePicture ? AF + user.profilePicture : "default_profile_picture_url"}
                className='w-40 h-40 rounded-full object-cover absolute left-0 right-0 m-auto top-[150px] border-[5px] border-black cursor-pointer'
                onClick={() => document.getElementById('profilePictureInput').click()}
              />
              <input
                type="file"
                id="profilePictureInput"
                style={{ display: 'none' }}
                onChange={handleProfilePictureChange}
              />
              {showProfileModal && (
                <div className="modal">
                  {/* Modal content for profile picture selection */}
                  <button onClick={handleSubmitProfile}>Save Profile Picture</button>
                </div>
              )}
            </div>
            <div className='flex flex-col items-center justify-center '>
              <h3 className='text-2xl font-medium'>{user.username}</h3>
              <span className='font-light'>{user.desc}</span>
            </div>
          </div>
          <div id="profilebottom" className='flex'>
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
