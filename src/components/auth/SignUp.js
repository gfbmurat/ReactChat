import React, { useState, useEffect } from 'react'
import allActions from '../../redux/actions/index'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Segment, Grid, Input, Form, Button, Header, Icon, Message } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
import styles from './login.module.css'

const SignUp = () => {
    const firebase = useFirebase()

    const [fbErrors, setFbErrors] = useState([]) // Firebase hatalarını tutmak
    const [submitting, setSubmitting] = useState(false) // Butona tıklanınca disabled yapmak

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const users = useSelector(state => state.userReducer)
    const dispatch = useDispatch()


    useEffect(() => {
        console.log(users);
    }, [users])

    const onSubmit = (data, e) => {
        // e.preventDefault();
        const { username, email, password, address } = data
        setSubmitting(true) // Buton disabled yapılacak
        setFbErrors([]) // Her submit yaptıktan sonra hatalar sıfırlanacak
        const [first, last] = data.username.split(' ')

        firebase.createUser(
            { email, password },
            {
                name: username,
                avatar: `https://ui-avatars.com/api/?name=${first}+${last ? last : ''}&background=random&color=fff`, // Eğer ikinci isim yoksa ilk ismin ilk 2 harfi avatar olur.
                address: address
            }
        ).then((firebaseUser) => {
            console.log(firebaseUser);
        }).catch((error) => {
            setFbErrors([{ message: error.message }])
        }).finally(() => {
            setSubmitting(false)
        })

        dispatch(allActions.userActions.addUser(data))
    }

    return (
        <div className={styles.container}>
            <Grid container>
                <Grid.Column computer="12">
                    <div style={{ margin: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }} >
                        <Header as='h2'>
                            <Icon name='signup' />
                            <Header.Content>
                                SIGN UP
                            </Header.Content>
                        </Header>
                    </div>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Segment inverted>
                            <Form.Field>
                                {/* <label className={styles.whiteLabel}>Name</label> */}
                                <Input
                                    {...register("username", { required: true })}
                                    onChange={(event, { name, value }) => {
                                        setValue(name, value)
                                    }}
                                    error={errors.username ? true : false}
                                    type="text"
                                    tabIndex="1"
                                    icon="user"
                                    iconPosition="left"
                                    name="username"
                                    placeholder="Username"
                                />
                            </Form.Field>
                            <Form.Field>
                                {/* <label className={styles.whiteLabel}>Email</label> */}
                                <Input
                                    {...register("email", { required: true })}
                                    onChange={(event, { name, value }) => {
                                        setValue(name, value)
                                    }}
                                    error={errors.email ? true : false}
                                    fluid
                                    tabIndex="2"
                                    inverted
                                    icon="mail"
                                    iconPosition="left"
                                    name="email"
                                    placeholder="Email"
                                />
                            </Form.Field>
                            <Form.Field>
                                {/* <label animated="fade" className={styles.whiteLabel}>Address</label> */}
                                <Input
                                    {...register("address", { required: true })}
                                    onChange={(event, { name, value }) => {
                                        setValue(name, value)
                                    }}
                                    fluid
                                    tabIndex="3"
                                    error={errors.address ? true : false}
                                    icon="tty"
                                    iconPosition="left"
                                    name="address"
                                    list='cities'
                                    placeholder='Choose City...'
                                />
                                <datalist id='cities'>
                                    <option value='İstanbul'>İstanbul</option>
                                    <option value='Ankara'>Ankara</option>
                                    <option value='İzmir'>İzmir</option>
                                </datalist>
                            </Form.Field>
                            <Form.Field>
                                {/* <label animated="fade" className={styles.whiteLabel}>Password</label> */}
                                <Input
                                    {...register("password", { required: true, minLength: 6 })}
                                    onChange={(event, { name, value }) => {
                                        setValue(name, value)
                                    }}
                                    error={errors.password ? true : false}
                                    type="password"
                                    fluid
                                    tabIndex="4"
                                    icon="user secret"
                                    iconPosition="left"
                                    name="password"
                                    placeholder='Password' />
                            </Form.Field>
                            <Form.Field >
                                <Button disabled={submitting} tabIndex="4" fluid type="submit" content='Register' color="orange" />
                            </Form.Field>
                        </Segment>
                    </Form>
                    {fbErrors.length > 0 && <Message style={{ textAlign: 'center' }} error >{fbErrors.map((error, index) => {
                        return <p key={index}>{error.message}</p>
                    })}</Message>}
                    <Message style={{ textAlign: 'center' }}>
                        Zaten bir hesabın var mı ?
                        <NavLink tabIndex="6" style={{ marginLeft: '.5rem' }} exact to="/login" activeClassName="active" className="item">Giriş Yap</NavLink>
                    </Message>

                </Grid.Column>
            </Grid>

        </div>
    )
}

export default SignUp
