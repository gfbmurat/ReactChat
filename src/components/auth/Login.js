import React, { useState, useEffect } from 'react'
import allActions from '../../redux/actions/index'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Segment, Grid, Input, Form, Button, Header, Icon, Message } from 'semantic-ui-react'
import { useFirebase } from 'react-redux-firebase'
import styles from './login.module.css'

const Login = () => {
    const firebase = useFirebase()
    const users = useSelector(state => state.userReducer)
    const dispatch = useDispatch()

    const [fbErrors, setFbErrors] = useState([]) // Firebase hatalarını tutmak
    const [submitting, setSubmitting] = useState(false) // Butona tıklanınca disabled yapmak


    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    useEffect(() => {
        console.log(users);
    }, [users])

    const onSubmit = (data, e) => {
        const { email, password } = data
        setSubmitting(true)
        setFbErrors([])
        firebase.login(
            { email, password })
            .then((data) => {
                console.log(data);
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
                            <Icon name='sign-in' />
                            <Header.Content>
                                LOGIN
                            </Header.Content>
                        </Header>
                    </div>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Segment inverted>

                            {/* <Form.Field>
                                <label className={styles.whiteLabel}>Name</label>
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
                            </Form.Field> */}

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
                                {/* <label animated="fade" className={styles.whiteLabel}>Password</label> */}
                                <Input
                                    {...register("password", { required: true, minLength: 6 })}
                                    onChange={(event, { name, value }) => {
                                        setValue(name, value)
                                    }}
                                    error={errors.password ? true : false}
                                    type="password"
                                    tabIndex="3"
                                    icon="user secret"
                                    iconPosition="left"
                                    name="password"
                                    placeholder='Password' />
                            </Form.Field>
                            <Form.Field >
                                <Button disabled={submitting} tabIndex="4" fluid type="submit" content='Login' color="orange" />
                            </Form.Field>
                        </Segment>
                    </Form>
                    {fbErrors.length > 0 && <Message style={{ textAlign: 'center' }} error >{fbErrors.map((error, index) => {
                        return <p key={index}>{error.message}</p>
                    })}</Message>}
                    <Message style={{ textAlign: 'center' }}>
                        Yeni misin ?
                        <NavLink style={{ marginLeft: '.5rem' }} exact to="/signup" activeClassName="active" className="item">Hesap Oluştur</NavLink>
                    </Message>
                </Grid.Column>
            </Grid>

        </div>
    )
}

export default Login
