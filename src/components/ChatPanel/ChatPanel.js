import React, { useRef, useState, useEffect } from 'react'
import { Segment, Icon, Header, Comment, Form, Input, Button } from 'semantic-ui-react'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import Message from './Message'
import { v4 as uuid_v4 } from "uuid";

const ChatPanel = ({ currentChannel }) => {

    useFirebaseConnect([{
        path: `messages/${currentChannel.key}`,
        storeAs: 'channelMessages'
    }])

    const firebase = useFirebase()
    const profile = useSelector(state => state.firebase.profile)
    const currentUserId = useSelector(state => state.firebase.auth.uid)
    const channelMessages = useSelector(state => state.firebase.ordered.channelMessages)

    const [searchTerm, setSearchTerm] = useState("")
    const [content, setContent] = useState("")

    const fileInputRef = useRef(null)
    const messageEndRef = useRef(null) // Yeni mesaj geldiğinde sayfa aşağı aksın



    useEffect(() => {
        messageEndRef.current.scrollIntoView({
            behaviour: "smooth",
            block: "end"
        })

    })

    const handleSubmit = event => {
        event.preventDefault();
        if (content !== "") {
            const message = {
                content,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    id: currentUserId,
                    name: profile.name,
                    avatar: profile.avatar
                }
            }
            firebase.push(`messages/${currentChannel.key}`, message)
                .then(() => {
                    setContent("")
                })
        }
    }
    const uploadMedia = event => {
        const file = event.target.files[0] // Sadece 1 dosya yüklenmesi işlemi(ilk seçilen)

        if (file) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`chat/public/${uuid_v4()}.jpg`)


            return fileRef.put(file).then((snap) => {
                fileRef.getDownloadURL().then((downloadURL) => {
                    sendMessageMedia(downloadURL);
                }).catch((error) => console.error("error uploading file"))
            })
        }
    }
    const sendMessageMedia = (url) => {
        const message = {
            image: url,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: currentUserId,
                name: profile.name,
                avatar: profile.avatar
            }
        }
        firebase.push(`messages/${currentChannel.key}`, message)
            .then(() => {
                console.log('Media Message Sent');
            })
    }

    const filterMessages = () => {
        const regex = new RegExp(searchTerm, "gi")
        const searchResults = [...channelMessages].reduce((acc, message) => {
            if ((message.value.content && message.value.content.match(regex)) ||
                (message.value.user && message.value.user.name.match(regex))) {
                acc.push(message)
            }
            return acc;
        }, [])
        return searchResults;
    }

    const renderedMessages = searchTerm !== "" ? filterMessages() : channelMessages

    return (
        <>
            {/* Message Header */}
            <Segment
                // style={{ background: "red" }}
                clearing>
                <Header as="h3" floated="left" />
                <span>
                    <Icon name="hashtag" />
                    {currentChannel.name.toUpperCase()}
                </span>
                {/* <Header.Subheader content={currentChannel.description} /> */}

                {/* Search Header */}
                <Header as="h3" floated="right">
                    <Input
                        size="mini"
                        icon="search"
                        name="searchTerm"
                        placeholder="Mesajlarda Ara..."
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)}
                    />
                </Header>
            </Segment>
            {/* Messages */}
            <Segment style={{ position: 'fixed', top: 55, bottom: '70', width: '81%' }}>
                <Comment.Group style={{ height: '80vh', overflow: 'auto', maxWidth: '100%' }}>
                    {renderedMessages && renderedMessages.map(({ key, value }) => (
                        <Message key={key} message={value} />
                    ))}
                    <div ref={messageEndRef} />
                </Comment.Group>
            </Segment>

            {/* Mesaj Gönderme Alanı */}
            <Segment style={{ position: 'fixed', bottom: '0', width: '85%', display: 'flex' }}>
                <Button icon onClick={() => fileInputRef.current.click()}>
                    <Icon name="add" />
                    <input onChange={uploadMedia} ref={fileInputRef} style={{ display: 'none' }} type="file" name="file" />
                </Button>
                <Form onSubmit={handleSubmit} style={{ flex: '1' }}>
                    <Input
                        fluid
                        name="message"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        labelPosition="left"
                        placeholder={`${currentChannel.name} kanalına mesaj gönder`} />
                </Form>
            </Segment>
        </>
    )
}

export default ChatPanel
