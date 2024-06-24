import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { deleteSlice, editSlice, fetchUserDetails } from '../../store/slice/userSlice';
import { UserInterface } from '../../model/user';
import { editUserInterface } from '../../model/editUser';

const ViewUserList: React.FC = () => {
    const users = useSelector((state: RootState) => state.user.users);
    const dispatch = useDispatch<AppDispatch>()
    const [isEdit,setIsEdit] = useState<number | null>(null)
    const [isEnabled, setEnabled] = useState<boolean | null>(false)
    const [editUserDetails, setEditUserDetails] = useState<UserInterface | null>(null)

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserInterface) => {
        if (editUserDetails) {
            setEditUserDetails({ ...editUserDetails, [field]: e.target.value });
        }
    };

    const handleEdit = (index: number, userDetails: UserInterface) => {
        setIsEdit(index)
        setEnabled(true)
        setEditUserDetails(userDetails)
        console.log(isEdit)
    }

    const handleSave = () => {
        console.log(editUserDetails)
        if (editUserDetails && editUserDetails._id) {
            const editItem: editUserInterface = {
                _id: editUserDetails._id,
                username: editUserDetails.username,
                email: editUserDetails.email,
                contact: editUserDetails.contact
            };
            dispatch(editSlice(editItem)); 
        }
    }

    const deleteUser = (userid: string) => {
        console.log(userid)
        dispatch(deleteSlice(userid))
    }

    return (
        <div>
            <h2>User List</h2>
            {isEnabled ? (
                <>
                    <h1>Edit form</h1>
                    <input type="text" value={editUserDetails?.username} onChange={(e) => handleInputChange(e, 'username')}/>
                    <input type="text" value={editUserDetails?.email} onChange={(e) => handleInputChange(e, 'email')}/>
                    <input type="number" value={editUserDetails?.contact} onChange={(e) => handleInputChange(e, 'contact')}/>
                    <button onClick={handleSave}>Update</button>
                </>
            ) : (
                <ul>
                    {users.map((user, index) => (
                        <React.Fragment key={index}>
                            <div>UserID: {user._id}</div>
                            <li>
                                {user.username}
                                <button onClick={() => handleEdit(index, user)}>Edit</button>
                                <button 
                                    onClick={() => {
                                        if (user._id) {
                                            deleteUser(user._id);
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ViewUserList;
