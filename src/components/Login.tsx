import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { loadUsersWithAuthInfo } from '../network/client';
import { AuthManager } from '../auth/AuthManager';
import { setUser as setUserAction } from '../store/actions';
import { IUser } from '../store/types';

const LoginWrapper = styled.div`
`;

const LoginPanel = styled.div`
`;

interface State {
    email: string;
    password: string;
    redirect: boolean;
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
        };
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect to="/exercises" />
        }

        return (
            <LoginWrapper>
                <LoginPanel>
                    <div>Login</div>
                    <div>
                        <form onSubmit={this.handleSubmission}>
                            <div>
                                <label>email</label>
                                <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
                            </div>
                            <div>
                                <label>password</label>
                                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </LoginPanel>
            </LoginWrapper>
        );
    }

    private handleSubmission = (event: any) => {
        event.preventDefault();
        const { email: username, password } = this.state;

        loadUsersWithAuthInfo({ username, password })
            .then((response) => {
                const currentUser = response.find((user: IUser) => user.email === username);
                this.props.setUser(currentUser);
                AuthManager.setAuthDetails({ username, password })
                this.setState({ redirect: true });
            })
            .catch((e) => {
                console.error('Error fetching users: ', e);
                // TODO handle error
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
