<?php
namespace App\Views;

class Renderer
{
    private static $instance = null;

    private function __construct()
    {}

    public static function getInstance()
    {
        if (self::$instance == null)
        {
            self::$instance = new \Mustache_Engine(array(
                'loader' => new \Mustache_Loader_FilesystemLoader(dirname(__FILE__)),
            ));
        }
        return self::$instance;
    }

    public static function render(string $view, array $data) {
        return self::getInstance()->render($view, $data);
    }
}
