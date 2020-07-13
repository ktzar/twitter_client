import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, parse } from 'date-fns'
import styled from 'styled-components';

const UserButton = styled.button`
    background: #eeeeef;
    border: none;
    cursor: pointer;
    transition: background .5s ease-out;

    &:active, &:hover, &:focus {
        background: #ccc;
    }
`;

const Link = styled.a`
    color: #338;
`;

const isValidHttpUrl = string => {
  let url;
  try {
    url = new URL(string);
  } catch (_) { return false; }
  return url.protocol === "http:" || url.protocol === "https:";
}

const cleanTwitterHandle = handle => handle.match(/\w+/)[0];

const wordToLink = word => <Link key={word} href={word} target="_blank">{word}{' '}</Link>

const TweetContent = ({children, onUserClick}) => {
    //Defined here to get access to onUserClick, it'd be more performant to make a curry function
    const mapWordToElement = (word, i) => {
        return word.indexOf('@') === 0
            ? <><UserButton key={i + word} onClick={
                () => onUserClick(cleanTwitterHandle(word))
                }>{word}</UserButton></>
            : (
                isValidHttpUrl(word)
                    ? wordToLink(word)
                    : <span key={i + word}>{word}{ ' ' }</span>
            )
    };

    if (typeof children !== 'string') {
        return <p>{children}</p>;
    }

    const content = children.split(' ').map(mapWordToElement);
    return <p>{content}</p>;
};

export default TweetContent;
