import React, { useState } from 'react'
import { Popup, Menu, Icon, Divider } from 'semantic-ui-react'
import ChannelList from '../Channels/ChannelList'
import CreateChannelForm from '../Channels/CreateChannelForm'
import UserPanel from '../UserPanel/UserPanel'
import { TwitterPicker } from 'react-color'
import styles from '../../app.module.css'

const SidePanel = () => {

    const [open, setOpen] = useState(false)
    const [color, setColor] = useState("#22194d");


    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Menu
                vertical
                inverted
                secondary
                color='blue'
                fixed="left"
                className={styles.sidepanel}
                style={{
                    background: color,
                    // width: "360px",
                    // fontSize: "1.2rem",
                    // height: "100vh",
                }}>
                <Menu.Item>
                    <TwitterPicker
                        color={color}
                        onChangeComplete={(color) => setColor(color.hex)}
                    />
                </Menu.Item>
                <Menu.Item>
                    {/* UserPanel */}
                    <UserPanel />
                </Menu.Item>
                <Divider horizontal>Channels</Divider>
                <Menu.Item>
                    <Menu.Header>
                        Kanallar
                        <span style={{ float: 'right' }}>
                            <Popup content="Yeni kanal Oluştur" trigger={<Icon style={{ cursor: 'pointer' }} name="add" onClick={(event) => handleOpen()} />} />
                        </span>
                    </Menu.Header>
                    <ChannelList />
                </Menu.Item>
            </Menu>

            {/* Create Channel Form */}
            <CreateChannelForm open={open} onOpen={handleOpen} onClose={handleClose} />
        </>
    )
}

export default SidePanel
