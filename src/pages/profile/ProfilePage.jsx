import React, { useState, useRef } from "react";
import Sidebar from "../../components/sidebar/SidebarProfile";
import { PencilIcon } from "@heroicons/react/20/solid";

const ProfilePage = () => {
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedGender, setEditedGender] = useState("");
  const [editedBirthdate, setEditedBirthdate] = useState("");
  const [editedProfilePicture, setEditedProfilePicture] = useState(null);

  const user = {
    username: "ContohPengguna",
    email: "pengguna@contoh.com",
    phone: "08123456789",
    profilePicture: "https://placekitten.com/150/150",
    createdAt: "0001-01-01T00:00:00Z",
    gender: "Male",
    birthdate: "2000-01-01",
  };

  const fileInputRef = useRef(null);

  const handleSaveClick = () => {
    // Add logic to save changes to backend or update state
    // Update user information in your state or API
    // Reset the edited values after saving
    setEditedName("");
    setEditedPhone("");
    setEditedGender("");
    setEditedBirthdate("");
    setEditedProfilePicture(null);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleProfilePictureClick = () => {
    // Trigger file input click when profile picture is clicked
    fileInputRef.current.click();
  };

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
                src={editedProfilePicture || user.profilePicture}
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
                  value={editedName || user.username}
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
                <label
                  htmlFor="editedEmail"
                  className="text-sm font-medium mb-2"
                >
                  Alamat Email:
                </label>
                <input
                  type="text"
                  id="editedEmail"
                  value={user.email}
                  readOnly
                  className="border rounded-md p-2 w-full mb-4 bg-gray-200 mt-2"
                />
                <label className="text-sm font-medium mb-2">
                  Jenis Kelamin:
                </label>
                <div className="flex items-center space-x-2 mb-4 mt-2">
                  <label>
                    <input
                      type="radio"
                      value="Male"
                      checked={editedGender === "Male"}
                      onChange={() => setEditedGender("Male")}
                    />
                    &nbsp;Laki-Laki
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Female"
                      checked={editedGender === "Female"}
                      onChange={() => setEditedGender("Female")}
                    />
                    &nbsp;Perempuan
                  </label>
                </div>
                <label
                  htmlFor="editedBirthdate"
                  className="text-sm font-medium mb-2"
                >
                  Tanggal Lahir:
                </label>
                <input
                  type="date"
                  id="editedBirthdate"
                  value={editedBirthdate || user.birthdate}
                  onChange={(e) => setEditedBirthdate(e.target.value)}
                  className="border rounded-md p-2 w-full mb-4 mt-2"
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
