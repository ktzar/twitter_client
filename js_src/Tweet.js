import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, parse } from 'date-fns'
import styled from 'styled-components';

import TweetContent from './TweetContent';

const TweetPic = styled.img`
    width: 100%;
`;

const TweetWrapper = styled.div`
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(224,245,245,1) 100%);
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    font-size: 14px;
    padding: 2px 12px;
`;

const Tweet = ({picture, text, date, id, onUserClick}) => {
    return (
      <TweetWrapper>
          <TweetContent onUserClick={onUserClick}>{text}</TweetContent>
            {picture && <TweetPic src={picture} alt="Some pic" />}
          <p><em>{formatDistanceToNow(new Date(date))} ago</em></p>
      </TweetWrapper>
  ); 
};

export default Tweet;

