import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { List, Image } from 'semantic-ui-react'

const UserList = () => {
    const users = useSelector(state => state.userReducer)
    useEffect(() => {
        console.log("UserList İçerisinde");
        console.log(users);
    })
    return (
        <div>
            <h1>Kullanıcılar</h1>
            <List animated verticalAlign="middle">
                {users.map((user, index) => (
                    <List.Item key={index}>
                        <Image avatar
                            src={user.gender === "Erkek" ? 'https://www.w3schools.com/howto/img_avatar.png' : "https://www.w3schools.com/howto/img_avatar2.png"} />
                        <List.Content>
                            <List.Header>{user?.username}</List.Header>
                        </List.Content>
                    </List.Item>

                ))}
            </List>
        </div>
    )
}

export default UserList
