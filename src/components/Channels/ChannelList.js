import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Menu } from 'semantic-ui-react'
import { setCurrentChannel } from '../../redux/actions/channelActions'

const ChannelList = () => {
    useFirebaseConnect([{ path: "channels" }]) // Firebase'de channeldeki değişiklerin dinleme
    const dispatch = useDispatch()
    const [mounted, setMounted] = useState(false)
    const channels = useSelector(state => state.firebase.ordered.channels)
    const currentChannel = useSelector(state => state.channelReducer.currentChannel)

    useEffect(() => {
        // Burada en başta bir kanalın seçili gelmesi için yazıldı.
        if (!mounted && !isEmpty(channels)) {
            const { key, value } = channels[0]; // Genel kanalı
            setActiveChannel({ key, ...value })
            setMounted(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted, channels])

    if (!isLoaded(channels)) {
        return "Loading channels"
    }

    if (isEmpty(channels)) {
        return "No channels"
    }

    const setActiveChannel = channel => {
        dispatch(setCurrentChannel(channel))
    }

    return (
        <Menu.Menu>
            {
                channels.map(({ key, value }) => (
                    <Menu.Item
                        key={key}
                        name={value?.name}
                        as="a"
                        icon="hashtag"
                        active={currentChannel?.key === key}
                        onClick={() => setActiveChannel({ key, ...value })}
                    />
                ))
            }
        </Menu.Menu>
    )
}


export default ChannelList
