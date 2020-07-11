<?php
use App\Domain\Tweet\TweetFetcher;
use App\Views\Renderer;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

return function (App $app) {
    $app->get('/', function (Request $request, Response $response) {
        $data = array('title' => 'Twitter feed');
        $response->getBody()->write(Renderer::render('homepage', $data));
        return $response;
    });

    $app->get('/tweets/{handle}', function (Request $request, Response $response, array $args) {
        try {
            $feed = new TweetFetcher();
            $info = $feed->findUserTweets($args['handle']);
            $response->getBody()->write(
                json_encode([
                    "success" => true,
                    "user" => $info["user"],
                    "tweets" => $info['tweets']
                ])
            );
        } catch(Exception $e) {
            $response->getBody()->write(
                json_encode(['success' => false, 'error' => $e->getMessage()])
            );
        }
        return $response;
    });
};
