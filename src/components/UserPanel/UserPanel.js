import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { Icon, Popup } from 'semantic-ui-react'
import Profile from '../auth/Profile'

const UserPanel = () => {
    const firebase = useFirebase();
    const profile = useSelector((state) => state.firebase.profile)

    const [open, setOpen] = useState(false)
    const [color, setColor] = useState("grey")

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setColor("grey")
        setOpen(false)
    }

    const signOut = () => {
        console.log("Logout yapıldı!");
        firebase.logout();
    }
    return (
        <>
            <div style={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Popup content="Profil Düzenle" trigger={<Icon style={{ cursor: 'pointer' }} name="setting" onClick={(event) => handleOpen()} />} />
                    <Link to="/profile" style={{ color: "#fff", fontWeight: "bold" }}>{profile?.name}</Link>
                </div>

                <div>
                    <Icon style={{ cursor: 'pointer', paddingX: '1rem' }} name="sign-out" onClick={() => signOut()} />
                </div>
            </div>
            <Profile color={color} open={open} onOpen={handleOpen} onClose={handleClose} />
        </>
    )
}

export default UserPanel
