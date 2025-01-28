<?php

namespace controllers;

use DB\Database;
use PDO;

class RecipeController
{
    private PDO $pdo;
    private array $dbconfig;

    public function __construct(Database $db, array $dbconfig)
    {
        $this->pdo = $db->getPDO();
        $this->dbconfig = $dbconfig;
    }

    public function getAllRecipes(): array
    {
        return $this->pdo->query("SELECT * FROM " . $this->dbconfig["database"]["table"])
            ->fetchAll(PDO::FETCH_ASSOC);
    }
}