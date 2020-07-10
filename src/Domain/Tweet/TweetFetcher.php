<?php
namespace App\Domain\Tweet;

class TweetFetcher implements TweetFeed
{
    const URL = "https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&screen_name=";

    public function findUserTweets(string $user): array {
        $token = TwitterBearerToken::getBearerToken();

        $curl = curl_init();
        $url = self::URL . urlencode($user);

        curl_setopt($curl, CURLOPT_URL, $url);
        //curl_setopt($curl, CURLOPT_VERBOSE, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer " . $token
        ]);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);
        $resultData = json_decode($result);

        if (
            $err = curl_error($curl) ||
            !$resultData ||
            isset($resultData['error']) ||
            count($resultData) === 0
        ) {
            throw new \Exception('Error getting tweets.');
        }

        curl_close($curl);

        $tweets = [];
        $user_info = array(
            "name" => $resultData[0]->user->name,
            "pic" => $resultData[0]->user->profile_image_url,
            "followers_count" => $resultData[0]->user->followers_count,
        );

        foreach($resultData as $tweet) {
            $picture = (isset($tweet->entities->media)
                ? $tweet->entities->media[0]->media_url_https
                : null
            );

            array_push($tweets, array(
                "text" => $tweet->text,
                "id" => $tweet->id_str,
                "date" => $tweet->created_at,
                "retweet_count" => $tweet->retweet_count,
                "favorite_count" => $tweet->favorite_count,
                "picture" => $picture,
            ));
        }

        return array(
            "tweets" => $tweets,
            "user" => $user_info
        );

    }
}
