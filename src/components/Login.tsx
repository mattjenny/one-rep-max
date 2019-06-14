import React from 'react';
import styled from 'styled-components';

import { fetchJsonWithAuthInfo } from '../util/fetch';

const LoginWrapper = styled.div`
`;

const LoginPanel = styled.div`
`;

interface LoginState {
    email: string;
    password: string;
}

export class Login extends React.PureComponent<{}, LoginState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    public render() {
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
        fetchJsonWithAuthInfo('http://localhost:3000/api/v1/users', 'GET', undefined, { username: this.state.email, password: this.state.password})
            .then((response) => console.log('Response! ', response))
            .catch((e) => console.error('Error fetching json: ', e));
    }

    private handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ email: event.currentTarget.value });
    }

    private handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ password: event.currentTarget.value });
    }
}
