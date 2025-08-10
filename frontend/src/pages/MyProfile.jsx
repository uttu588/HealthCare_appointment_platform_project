import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
	const [isEdit, setIsEdit] = useState(false);

	const [image, setImage] = useState(false);

	const { token, backendUrl, userData, setUserData, loadUserProfileData } =
		useContext(AppContext);

	// Function to update user profile data using API
	const updateUserProfileData = async () => {
		try {
			const formData = new FormData();

			formData.append("name", userData.name);
			formData.append("phone", userData.phone);
			formData.append("address", JSON.stringify(userData.address));
			formData.append("gender", userData.gender);
			formData.append("dob", userData.dob);

			image && formData.append("image", image);

			const { data } = await axios.post(
				backendUrl + "/api/user/update-profile",
				formData,
				{ headers: { token } }
			);

			if (data.success) {
				toast.success(data.message);
				await loadUserProfileData();
				setIsEdit(false);
				setImage(false);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return userData ? (
		<div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
			{isEdit ? (
				<label htmlFor="image">
					<div className="inline-block relative cursor-pointer">
						<img
							className="w-36 rounded opacity-75"
							src={image ? URL.createObjectURL(image) : userData.image}
							alt=""
						/>
						<img
							className="w-10 absolute bottom-12 right-12"
							src={image ? "" : assets.upload_icon}
							alt=""
						/>
					</div>
					<input
						onChange={(e) => setImage(e.target.files[0])}
						type="file"
						id="image"
						hidden
					/>
				</label>
			) : (
				<img
					className="w-36 rounded"
					src={userData.image}
					alt=""
				/>
			)}

			{isEdit ? (
				<input
					className="bg-gray-50 text-3xl font-medium max-w-60"
					type="text"
					onChange={(e) =>
						setUserData((prev) => ({ ...prev, name: e.target.value }))
					}
					value={userData.name}
				/>
			) : (
				<p className="font-medium text-3xl text-[#262626] mt-4">
					{userData.name}
				</p>
			)}

			<hr className="bg-[#ADADAD] h-[1px] border-none" />

			<div>
				<p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
				<div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
					<p className="font-medium">Email id:</p>
					<p className="text-blue-500">{userData.email}</p>
					<p className="font-medium">Phone:</p>

					{isEdit ? (
						<input
							className="bg-gray-50 max-w-52"
							type="text"
							onChange={(e) =>
								setUserData((prev) => ({ ...prev, phone: e.target.value }))
							}
							value={userData.phone}
						/>
					) : (
						<p className="text-blue-500">{userData.phone}</p>
					)}

					<p className="font-medium">Address:</p>

					{isEdit ? (
						<p>
							<input
								className="bg-gray-50"
								type="text"
								onChange={(e) =>
									setUserData((prev) => ({
										...prev,
										address: { ...prev.address, line1: e.target.value },
									}))
								}
								value={userData.address.line1}
							/>
							<br />
							<input
								className="bg-gray-50"
								type="text"
								onChange={(e) =>
									setUserData((prev) => ({
										...prev,
										address: { ...prev.address, line2: e.target.value },
									}))
								}
								value={userData.address.line2}
							/>
						</p>
					) : (
						<p className="text-gray-500">
							{userData.address.line1} <br /> {userData.address.line2}
						</p>
					)}
				</div>
			</div>
			<div>
				<p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>
				<div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
					<p className="font-medium">Gender:</p>

					{isEdit ? (
						<select
							className="max-w-20 bg-gray-50"
							onChange={(e) =>
								setUserData((prev) => ({ ...prev, gender: e.target.value }))
							}
							value={userData.gender}
						>
							<option value="Not Selected">Not Selected</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					) : (
						<p className="text-gray-500">{userData.gender}</p>
					)}

					<p className="font-medium">Birthday:</p>

					{isEdit ? (
						<input
							className="max-w-28 bg-gray-50"
							type="date"
							onChange={(e) =>
								setUserData((prev) => ({ ...prev, dob: e.target.value }))
							}
							value={userData.dob}
						/>
					) : (
						<p className="text-gray-500">{userData.dob}</p>
					)}
				</div>
			</div>
			<div className="mt-10">
				{isEdit ? (
					<button
						onClick={updateUserProfileData}
						className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
					>
						Save information
					</button>
				) : (
					<button
						onClick={() => setIsEdit(true)}
						className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
					>
						Edit
					</button>
				)}
			</div>
		</div>
	) : null;
};

export default MyProfile;
// const MyProfile = () => {
// 	const { userData, setUserData } = useContext(AppContext);
// 	const [localUserData, setLocalUserData] = useState({ ...userData });
// 	const [editMode, setEditMode] = useState(false);
// 	const [selectedImage, setSelectedImage] = useState(null);
// 	const [imagePreview, setImagePreview] = useState(
// 		userData?.profileImage || ""
// 	);
// 	const fileInputRef = useRef(null);

// 	useEffect(() => {
// 		setLocalUserData({ ...userData });
// 		setImagePreview(userData?.profileImage || "");
// 	}, [userData]);

// 	const handleEdit = () => setEditMode(true);
// 	const handleCancel = () => {
// 		setEditMode(false);
// 		setLocalUserData({ ...userData });
// 		setImagePreview(userData?.profileImage || "");
// 		setSelectedImage(null);
// 	};

// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target;
// 		setLocalUserData((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleImageChange = (e) => {
// 		const file = e.target.files[0];
// 		if (file) {
// 			setSelectedImage(file);
// 			setImagePreview(URL.createObjectURL(file));
// 		}
// 	};

// 	const handleSave = async () => {
// 		try {
// 			const formData = new FormData();
// 			formData.append("userId", userData._id);
// 			formData.append("name", localUserData.name);
// 			formData.append("email", localUserData.email);
// 			formData.append("phone", localUserData.phone || "");
// 			formData.append("bloodGroup", localUserData.bloodGroup || "");
// 			if (selectedImage) {
// 				formData.append("profileImage", selectedImage);
// 			}
// 			const { data } = await axios.post(
// 				`${import.meta.env.VITE_BACKEND_URL}/api/user/update-profile`,
// 				formData,
// 				{ headers: { "Content-Type": "multipart/form-data" } }
// 			);
// 			setUserData(data.user);
// 			setEditMode(false);
// 			setSelectedImage(null);
// 		} catch (error) {
// 			alert("Failed to update profile");
// 		}
// 	};

// 	return (
// 		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-8 px-2 md:px-0">
// 			<div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 relative">
// 				<div className="flex flex-col items-center gap-4">
// 					<div className="relative group">
// 						<img
// 							src={imagePreview || "/default-profile.png"}
// 							alt="Profile"
// 							className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-md"
// 						/>
// 						{editMode && (
// 							<button
// 								className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition"
// 								onClick={() => fileInputRef.current.click()}
// 								aria-label="Change Profile Picture"
// 							>
// 								<svg
// 									xmlns="http://www.w3.org/2000/svg"
// 									fill="none"
// 									viewBox="0 0 24 24"
// 									strokeWidth={1.5}
// 									stroke="currentColor"
// 									className="w-5 h-5"
// 								>
// 									<path
// 										strokeLinecap="round"
// 										strokeLinejoin="round"
// 										d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3zm0 0v3h3"
// 									/>
// 								</svg>
// 								<input
// 									type="file"
// 									accept="image/*"
// 									ref={fileInputRef}
// 									className="hidden"
// 									onChange={handleImageChange}
// 								/>
// 							</button>
// 						)}
// 					</div>
// 					<div className="w-full flex flex-col gap-2 mt-2">
// 						<label className="text-gray-600 font-semibold">Name</label>
// 						{editMode ? (
// 							<input
// 								type="text"
// 								name="name"
// 								value={localUserData.name}
// 								onChange={handleInputChange}
// 								className="input input-bordered w-full"
// 							/>
// 						) : (
// 							<div className="text-lg font-medium text-gray-800">
// 								{localUserData.name}
// 							</div>
// 						)}
// 					</div>
// 					<div className="w-full flex flex-col gap-2">
// 						<label className="text-gray-600 font-semibold">Email</label>
// 						<div className="text-gray-700">{localUserData.email}</div>
// 					</div>
// 					<div className="w-full flex flex-col gap-2">
// 						<label className="text-gray-600 font-semibold">
// 							Contact Number
// 						</label>
// 						{editMode ? (
// 							<input
// 								type="text"
// 								name="phone"
// 								value={localUserData.phone || ""}
// 								onChange={handleInputChange}
// 								className="input input-bordered w-full"
// 							/>
// 						) : (
// 							<div className="text-gray-700">{localUserData.phone || "-"}</div>
// 						)}
// 					</div>
// 					<div className="w-full flex flex-col gap-2">
// 						<label className="text-gray-600 font-semibold">Blood Group</label>
// 						{editMode ? (
// 							<input
// 								type="text"
// 								name="bloodGroup"
// 								value={localUserData.bloodGroup || ""}
// 								onChange={handleInputChange}
// 								className="input input-bordered w-full"
// 							/>
// 						) : (
// 							<div className="text-gray-700">
// 								{localUserData.bloodGroup || "-"}
// 							</div>
// 						)}
// 					</div>
// 					<div className="flex gap-4 mt-4">
// 						{editMode ? (
// 							<>
// 								<button
// 									className="btn btn-primary"
// 									onClick={handleSave}
// 								>
// 									Save
// 								</button>
// 								<button
// 									className="btn btn-secondary"
// 									onClick={handleCancel}
// 								>
// 									Cancel
// 								</button>
// 							</>
// 						) : (
// 							<button
// 								className="btn btn-outline"
// 								onClick={handleEdit}
// 							>
// 								Edit Profile
// 							</button>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default MyProfile;
