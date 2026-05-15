import React from "react";
import useAuth from "../../hooks/useAuth";
import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

const ViewProfile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-gray-200 pb-6">
          
          <img
            src={
              user?.photoURL ||
              "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {user?.displayName || "Unknown User"}
            </h1>

            <p className="text-gray-500 mt-1">
              User Account
            </p>
          </div>
        </div>

        {/* Information */}
        <div className="mt-8 space-y-5">

          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="text-gray-600 text-lg">
              <FaEnvelope />
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>

              <h2 className="text-gray-900 font-medium break-all">
                {user?.email}
              </h2>
            </div>
          </div>

          {/* Username */}
          <div className="flex items-center gap-4">
            <div className="text-gray-600 text-lg">
              <FaUser />
            </div>

            <div>
              <p className="text-sm text-gray-500">Username</p>

              <h2 className="text-gray-900 font-medium">
                {user?.displayName || "Not Available"}
              </h2>
            </div>
          </div>

          {/* Account Created */}
          <div className="flex items-center gap-4">
            <div className="text-gray-600 text-lg">
              <FaCalendarAlt />
            </div>

            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <h2 className="text-gray-900 font-medium">
                {user?.metadata?.creationTime
                  ? new Date(
                      user.metadata.creationTime
                    ).toLocaleDateString()
                  : "N/A"}
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="px-5 py-2 bg-mist-700 text-white rounded-lg hover:bg-black cursor-pointer">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;