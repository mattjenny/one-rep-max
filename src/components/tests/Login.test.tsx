import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { NetworkClient } from '../../network/client';
import { UnconnectedLogin } from '../Login';

describe('Login component', () => {
    it('Renders the component', () => {
        const wrapper = shallow(<UnconnectedLogin setUser={() => {}} />);
        expect(wrapper.find('.onerep-login-wrapper')).toHaveLength(1);
    })

    it('Inputs update state', () => {
        const wrapper = shallow(<UnconnectedLogin setUser={() => {}} />);
        wrapper.find('.onerep-email-input').simulate('change', { currentTarget: { value: 'bob@example.com'} });
        wrapper.find('.onerep-password-input').simulate('change', { currentTarget: { value: 'wrongpassword'} });
        expect(wrapper.state()).toMatchObject({
            email: 'bob@example.com',
            password: 'wrongpassword',
            redirect: false,
            invalid: false,
        });
    })

    it('Form submission fires getUsers event', () => {
        const getUsersEvent = sinon.spy(NetworkClient, 'getUsersWithAuthInfo');
        const wrapper = shallow(<UnconnectedLogin setUser={() => {}} />);
        wrapper.find('.onerep-email-input').simulate('change', { currentTarget: { value: 'bob@example.com'} });
        wrapper.find('.onerep-password-input').simulate('change', { currentTarget: { value: 'wrongpassword'} });
        wrapper.find('.onerep-login-form').simulate('submit', { preventDefault: () => {} });
        expect(getUsersEvent.calledOnce).toBe(true);
        expect(getUsersEvent.getCall(0).args).toMatchObject([ { email: 'bob@example.com', password: 'wrongpassword' } ]);
    })
})
