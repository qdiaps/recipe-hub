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

    public function addRecipe(array $data): void
    {
        $stmt = $this->pdo->prepare("INSERT INTO " . $this->dbconfig["database"]["table"] .
            " (title, ingredients, instructions, cook_time, category)
            VALUES (:title, :ingredients, :instructions, :cook_time, :category)");
        $stmt->execute([
            ":title" => $data["title"],
            ":ingredients" => $data["ingredients"],
            ":instructions" => $data["instructions"],
            ":cook_time" => $data["cook_time"],
            ":category" => $data["category"]
        ]);
    }

    public function deleteRecipe(int $id): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM " . $this->dbconfig["database"]["table"] .
            " WHERE id = :id");
        $stmt->execute([":id" => $id]);
    }
}