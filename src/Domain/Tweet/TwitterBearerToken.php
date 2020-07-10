<?php
namespace App\Domain\Tweet;


class TwitterBearerToken
{
    const URL = "https://api.twitter.com/oauth2/token";

    static public function getBearerToken()
    {
        //TODO Cache
        $API_KEY = $_ENV['TWITTER_API_KEY'];
        $API_SECRET = $_ENV['TWITTER_API_SECRET_KEY'];

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, self::URL);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, array("grant_type" => "client_credentials"));
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, $API_KEY . ":" . $API_SECRET);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        if ($err = curl_error($curl)) {
            throw new \Exception('Error getting bearer token.');
        }

        $result = curl_exec($curl);
        $parsedResult = json_decode($result);

        curl_close($curl);
        return $parsedResult->access_token;
    }
}
