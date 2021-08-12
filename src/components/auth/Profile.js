import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Modal, Form, Button, Input, Icon } from 'semantic-ui-react'
import { useFirebase } from 'react-redux-firebase'

const Profile = ({ color, open, onOpen, onClose }) => {
    const firebase = useFirebase();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const uid = useSelector(state => state.firebase.auth.uid)

    const onSubmit = ({ name, address }) => {
        const [first, last] = name.split(' ')
        const avatar = `https://ui-avatars.com/api/?name=${first}+${last ? last : ''}&background=random&color=fff`
        firebase.database().ref("users").child(uid).update({ name, address, avatar })
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose} onOpen={onOpen}>
            <Modal.Header>Profili Düzenle</Modal.Header>
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
                            icon={<Icon color={errors.name ? "red" : color} name="user" />}
                            iconPosition="left"
                            name="name"
                            placeholder="Kullanıcı Adı"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            {...register("address", { required: true })}
                            onChange={(event, { name, value }) => {
                                setValue(name, value)
                            }}
                            error={errors.address ? true : false}
                            fluid
                            icon={<Icon color={errors.address ? "red" : color} name="address book" />}
                            iconPosition="left"
                            name="address"
                            list='cities'
                            placeholder="Adres"
                        />
                        <datalist id='cities'>
                            <option value='İstanbul'>İstanbul</option>
                            <option value='Ankara'>Ankara</option>
                            <option value='İzmir'>İzmir</option>
                        </datalist>
                    </Form.Field>
                </Form>
            </Modal.Content>

            <Modal.Actions >
                <Button color="black" onClick={() => onClose()}>Vazgeç</Button>
                <Button content="Kaydet" icon="checkmark" positive onClick={() => handleSubmit(onSubmit)()} />
            </Modal.Actions>
        </Modal>
    )
}

export default Profile
