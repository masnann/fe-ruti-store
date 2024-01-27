import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/sidebar/SidebarProfile";
import { PencilIcon } from "@heroicons/react/20/solid";
import getUserProfile from "../../hooks/profile/GetProfileApi";
import editUserProfile from "../../hooks/profile/EditProfileApi";
import Loading from "../../components/modals/Loading";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedGender, setEditedGender] = useState("");
  const [editedProfilePicture, setEditedProfilePicture] = useState(null);
  const [user, setUser] = useState({});
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true); 

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);

        // Set the gender based on the API response
        setEditedGender(userData.gender || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      if (editedProfilePicture instanceof File) {
        formData.append("photo", editedProfilePicture);
      }
      formData.append("name", editedName);
      formData.append("phone", editedPhone);
      formData.append("gender", editedGender);

      // Call the API to update the profile
      const response = await editUserProfile(formData);
      console.log(response);

      // Reload the page after a successful edit
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the file object
      setEditedProfilePicture(file);
    }
  };

  const handleProfilePictureClick = () => {
    // Trigger file input click when profile picture is clicked
    fileInputRef.current.click();
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 min-h-screen bg-gray-100">
      <div className="container mx-auto lg:px-8 lg:max-w-7xl">
        <div className="flex flex-wrap">
          <Sidebar />

          {/* Profile Content */}
          <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-4 lg:p-8 mt-4 lg:mt-0">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Profil Pengguna
            </h2>
            <div className="flex justify-center items-center relative">
              <img
                src={
                  editedProfilePicture instanceof File
                    ? URL.createObjectURL(editedProfilePicture)
                    : editedProfilePicture || user.photo_profile
                }
                alt="Foto Profil"
                className="w-24 h-24 rounded-full object-cover cursor-pointer"
                onClick={handleProfilePictureClick}
              />
              <label
                htmlFor="profilePicture"
                className="ml-2 bg-white rounded-full p-1 cursor-pointer"
              >
                <PencilIcon className="w-5 h-5" />
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
              <div className="flex-1">
                <label htmlFor="editedName" className="text-sm font-medium">
                  Nama Pengguna:
                </label>
                <input
                  type="text"
                  id="editedName"
                  value={editedName || user.name}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border rounded-md p-2 w-full mb-4 mt-2"
                />
                <label
                  htmlFor="editedPhone"
                  className="text-sm font-medium mb-2"
                >
                  Nomor Telepon:
                </label>
                <input
                  type="text"
                  id="editedPhone"
                  value={editedPhone || user.phone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  className="border rounded-md p-2 w-full mb-4 mt-2"
                />
                <label className="text-sm font-medium mb-2">
                  Jenis Kelamin:
                </label>
                <div className="flex items-center space-x-2 mb-4 mt-2">
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      value="Male"
                      checked={editedGender === "Male"}
                      onChange={() => setEditedGender("Male")}
                    />
                    <span className="ml-1">Laki-Laki</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      value="Female"
                      checked={editedGender === "Female"}
                      onChange={() => setEditedGender("Female")}
                    />
                    <span className="ml-1">Perempuan</span>
                  </label>
                </div>
                <label className="text-sm font-medium mb-2">Email:</label>
                <input
                  type="text"
                  id="editedEmail"
                  value={user.email || ""}
                  readOnly
                  className="border rounded-md p-2 w-full mb-4 mt-2 bg-gray-100"
                />
                <label className="text-sm font-medium mb-2">
                  Tanggal Dibuat:
                </label>
                <input
                  type="text"
                  id="created_at"
                  value={formatDate(user.created_at) || ""}
                  readOnly
                  className="border rounded-md p-2 w-full mb-4 mt-2 bg-gray-100"
                />
                <div className="mt-2">
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-auto"
                    onClick={handleSaveClick}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
