import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 8px;
`;

const InputField = styled.input`
    border: 1px solid #ccc;
    background: white;
    box-shadow: inset 0 3px 10px rgba(0,0,0,0.2);
    color: #79a;
    padding: 4px 6px;
    border-radius: 8px;
    margin:0 4px;
`;

const Button = styled.button`
    border: 0;
    background: #79a;
    color: white;
    padding: 4px 6px;
    border-radius: 8px;
`;

const UserForm = ({onUserChange}) => {
    const [ value, setValue ] = useState();

    const onSubmit = evt => {
        evt.preventDefault();
        setValue('');
        onUserChange(value);
    };

    const onUpdate = evt => {
        setValue(evt.target.value);
    };

    return (
      <Wrapper>
        <form onSubmit={onSubmit}>
            <InputField placeholder="Username" onChange={onUpdate} />
            <Button type="submit">Load tweets</Button>
        </form>
      </Wrapper>
  ); 
};

export default UserForm;

