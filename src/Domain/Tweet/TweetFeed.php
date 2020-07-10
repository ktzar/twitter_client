<?php
namespace App\Domain\Tweet;

interface TweetFeed
{
    public function findUserTweets(string $user): array;
}
