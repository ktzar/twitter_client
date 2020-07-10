import React, { useEffect, useState } from 'react';
import { format, parse } from 'date-fns'
import styled from 'styled-components';
import numeral from 'numeral';

const UserWrapper = styled.div`
    display: flex;
    padding: 8px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 16px;
`;

const ProfilePic = styled.img`
    padding: 4px;
    border: 1px solid #999;
    margin-right: 8px;
`;

const Name = styled.div`
line-height: 1.5em;
`;

const User = ({name, followers_count, pic}) => {
    return (
      <UserWrapper>
        { !name
            ? <div>No such user</div>
            : <>
                <ProfilePic src={pic} alt={name} />
                <Name>
                    <div><strong>{name}</strong></div>
                    <div>{numeral(followers_count).format('0,0')} followers</div>
                </Name>
            </>
        }
      </UserWrapper>
  ); 
};

export default User;

