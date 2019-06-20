import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { NetworkClient } from '../network/client';
import { AuthManager } from '../auth/AuthManager';
import { setUser as setUserAction } from '../store/actions';
import { IUser } from '../store/types';
import {
    GRAY,
    DARK_GRAY,
    GREEN,
    RED,
    WARN,
} from '../constants/colors';

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 70px;
    height: 100%;
    background: ${DARK_GRAY};
`;

const LoginPanel = styled.div`
    border: 1px solid gray;
    border-radius: 4px;
    padding: 10px 20px;
    width: 450px;
    max-width: 100%;
    height: 280px;
    max-height: 100%;
    background: ${GRAY};
    color: white;
`;

const Divider = styled.div`
    padding: 5px 40px;
    border-top: 1px solid gray;
    height: 1px;
`;

const InvalidText = styled.p`
    color: ${WARN};
    font-style: italic;
`;

const FormItems = styled.ol`
    margin-top: 30px;
    list-style: none;
    padding-inline-start: 0;
`;

const FormItem = styled.li`
    margin-bottom: 10px;
    display: flex;
`;

const FormLabel = styled.label`
    width: 25%;
    font-weight: 700;
`;

const FormInput = styled.input`
    padding: 10px;
    border: 1px solid gray;
    border-radius: 4px;
    width: 75%;
`;

const SubmitButton = styled.button`
    background: ${GREEN};
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: 700;
    height: 30px;
    width: 100px;
    font-size: 16px;
    float: right;
`;

const RequiredText = styled.span`
    color: ${RED};
`;

interface State {
    email: string;
    password: string;
    redirect: boolean;
    invalid: boolean;
}

interface IDispatchProps {
    setUser(user: IUser): void;
}

type Props = IDispatchProps;

class UnconnectedLogin extends React.PureComponent<Props, State> {
    public constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: AuthManager.isAuthenticated(),
            invalid: false,
        };
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect to="/exercises" />
        }

        return (
            <LoginWrapper>
                <LoginPanel>
                    <h2>Welcome to Matt's one rep max app!</h2>
                    <Divider />
                    <form onSubmit={this.handleSubmission}>
                        {this.renderSubtitleText()}
                        <FormItems>
                            <FormItem>
                                <FormLabel>Email<RequiredText>*</RequiredText></FormLabel>
                                <FormInput type="email" value={this.state.email} onChange={this.handleEmailChange} />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Password<RequiredText>*</RequiredText></FormLabel>
                                <FormInput type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </FormItem>
                        </FormItems>
                        <SubmitButton type="submit">Login</SubmitButton>
                    </form>
                </LoginPanel>
            </LoginWrapper>
        );
    }

    private renderSubtitleText = () => {
        if (this.state.invalid) {
            return <InvalidText>Invalid username or password.</InvalidText>
        }
        return <p>Please log in to continue.</p>;
    }

    private handleSubmission = (event: any) => {
        event.preventDefault();
        const { email: email, password } = this.state;

        NetworkClient.getUsersWithAuthInfo({ email, password })
            .then((response) => {
                const currentUser = response.find((user: IUser) => user.email === email);
                this.props.setUser(currentUser);
                const userId = currentUser && currentUser.id;
                AuthManager.setSessionCookie({ email, password, userId })
                this.setState({ redirect: true });
            })
            .catch((e) => {
                this.setState({ invalid: true });
            });
    }

    private handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ email: event.currentTarget.value });
    }

    private handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ password: event.currentTarget.value });
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setUser: (user: IUser) => dispatch(setUserAction(user)),
    }
}

export const Login = connect(null, mapDispatchToProps)(UnconnectedLogin);
