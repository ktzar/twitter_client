import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle} from 'styled-components';

import Tweet from './Tweet';
import User from './User';
import Spinner from './Spinner';
import UserForm from './UserForm';

const Error = styled.div`
    border-bottom: 1px solid #700;
    color: white;
    background: #f44;
    padding: 4px 8px;
`;

const Wrapper = styled.div`
    border: 1px solid #bbb;
    box-shadow: 0 5px 10px rgba(0,0,0,0.5);
    color: #333;
    max-width: 350px;
`;

const Title = styled.h2`
    text-align: center;
`;

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Helvetica, Arial, sans-serif;
    }
`;

class TweetList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            handle: 'disney',
            tweets: null,
            error: false,
            userInfo: null
        };
        this.onSetUsername = this.onSetUsername.bind(this);
    }

    onSetUsername(handle) {
        this.setState({handle}, () => {
            this.fetch();
        });
    }

    fetch() {
        this.setState({loading: true, error: false});
        fetch('/tweets/' + this.state.handle)
            .then(d => d.json())
            .then(d => {
                this.setState({userInfo: d.user, tweets: d.tweets, error: false, loading: false});
            })
            .catch(err => this.setState({error: true, loading: false}));
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        const { userInfo, handle, loading, error, tweets } = this.state;
        const title = handle ? `Tweets for ${handle}` : '';
        return (
            <Wrapper>
                <GlobalStyle />
                { error && <Error>There was an error fetching the data</Error> }
                <Title>{title}</Title>
                <UserForm onUserChange={this.onSetUsername} />
                {loading 
                    ? <Spinner />
                    : <React.Fragment>
                        <User {...userInfo} />
                        {tweets && tweets.map(t => <Tweet onUserClick={this.onSetUsername} {...t} key={t.id} />)}
                      </React.Fragment>
                }
            </Wrapper>
        ); 
    }
} 

export default TweetList;

