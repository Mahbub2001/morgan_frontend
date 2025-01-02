"use client";
import { getUserProfile } from "@/api/user";
import EditAddress from "@/components/EditAddress/EditAddress";
import EditProfile from "@/components/EditProfile/EditProfile";
import Button3 from "@/containers/common/Button3/Button3";
import { AuthContext } from "@/hooks/AuthProvider";
import React, { useContext, useState } from "react";

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState(null);
  const fetchProfile = async () => {
    if (user) {
      getUserProfile(user.email).then((data) => {
        setInfo(data);
      });
    }
  };
  return (
    <div className="container mx-auto">
      <div>
        <EditProfile info={info} fetchProfile={fetchProfile} user={user} />
      </div>
      <div>
        <EditAddress info={info} fetchProfile={fetchProfile} />
      </div>
    </div>
  );
}

export default UserProfile;
