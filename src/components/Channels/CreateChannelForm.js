import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Modal, Form, Button, Input, Icon } from 'semantic-ui-react'
import { useFirebase } from 'react-redux-firebase'

const CreateChannelForm = ({ open, onOpen, onClose }) => {

    const firebase = useFirebase();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const profile = useSelector(state => state.firebase.profile)

    const onSubmit = ({ name, description }) => {
        firebase.push("channels", {
            name,
            description,
            createdBy: {
                name: profile.name,
                avatar: profile.avatar
            }
        })
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose} onOpen={onOpen}>
            <Modal.Header>Yeni Kanal Oluştur.</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Field>
                        <Input
                            {...register("name", { required: true })}
                            onChange={(event, { name, value }) => {
                                setValue(name, value)
                            }}
                            error={errors.name ? true : false}
                            fluid
                            icon={<Icon color={errors.name ? "red" : "grey"} name="hashtag" />}
                            iconPosition="left"
                            name="name"
                            placeholder="#Genel"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            {...register("description", { required: true, minLength: 10 })}
                            onChange={(event, { name, value }) => {
                                setValue(name, value)
                            }}
                            error={errors.description ? true : false}
                            fluid
                            icon={<Icon color={errors.description ? "red" : "grey"} name="comment" />}
                            iconPosition="left"
                            name="description"
                            placeholder="#Genel kanal oluştur."
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>

            <Modal.Actions >
                <Button color="black" onClick={() => onClose()}>Vazgeç</Button>
                <Button content="Oluştur" icon="checkmark" positive onClick={() => handleSubmit(onSubmit)()} />
            </Modal.Actions>
        </Modal>
    )
}

export default CreateChannelForm
