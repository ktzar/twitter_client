import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, parse } from 'date-fns'
import styled from 'styled-components';

import TweetContent from './TweetContent';

const TweetPic = styled.img`
    width: 100%;
`;

const TweetWrapper = styled.div`
    transition: all 1s ease-out;
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(224,245,245,1) 100%);
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    font-size: 14px;
    padding: 2px 12px;

    &:hover, &:active, &:focus {
        background: linear-gradient(180deg, rgba(255,255,255,1) 50%, rgba(224,245,245,1) 100%);
    }


    &.tweet-enter {
        opacity: 0.01;
    }

    &.tweet-enter.tweet-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
    }

    &.tweet-leave {
        opacity: 1;
    }

    &.tweet-leave.tweet-leave-active {
        opacity: 0.01;
        transition: opacity 300ms ease-in;
    }
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

