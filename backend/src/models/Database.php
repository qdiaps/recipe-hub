<?php

namespace DB;

use Exception;
use PDO;
use PDOException;

class Database
{
    private PDO $pdo;

    public function __construct(string $config)
    {
        try {
            if (!$settings = parse_ini_file($config, true))
                throw new Exception("Unable to open database configuration file: " . $config);

            $dsn = "mysql:host=" . $settings["database"]["host"] .
                ";dbname=" . $settings["database"]["dbname"] .
                ";charset=utf8mb4";
            $this->pdo = new PDO($dsn, $settings["database"]["user"], $settings["database"]["password"]);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function tableExists(string $name): bool
    {
        $stmt = $this->pdo->prepare("SHOW TABLES LIKE :name");
        $stmt->execute([":name" => $name]);
        return $stmt->rowCount() > 0;
    }

    public function createTable(string $name, array $values): void
    {
        $stmt = $this->pdo->prepare("CREATE TABLE IF NOT EXISTS $name (" .
            implode(", ", $values) . ")");
        $stmt->execute();
    }

    public function getPdo(): PDO
    {
        return $this->pdo;
    }
}