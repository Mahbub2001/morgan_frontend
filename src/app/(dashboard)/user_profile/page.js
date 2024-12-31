"use client";
import EditAddress from "@/components/EditAddress/EditAddress";
import EditProfile from "@/components/EditProfile/EditProfile";
import Button3 from "@/containers/common/Button3/Button3";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function UserProfile() {
  return (
    <div className="container mx-auto">
      <div>
        <EditProfile />
      </div>
      <div>
        {/* <EditAddress /> */}
      </div>
    </div>
  );
}

export default UserProfile;
