<?php
/**
 * Name: dbcontroller.php
 * Author: LIGNEUL Dylan
 * Creation: 11/01/2018
 * Modification: 11/01/2018
 * Ce controller gère l'accès à la base de données
 */

class DBController
{
    private $conn;

    //Le constructeur renvoie une instance de la base de données qui sert à lancer les requetes.
    function __construct()
    {
        $connection = $this->connectDBMSQL();

        if (!empty($connection)) {
            $this->conn = $connection;
        }
    }

    function connectDBMSQL()
    {
        include '../connexion/sqlConn.php';
        $connection = mysqli_connect($hostMSQL, $loginMSQL, $passwordMSQL, $databaseMSQL);
        return $connection;
    }



    function getConn(){
        return $this->conn;
    }

    function executeQueryMSQL($stmt)
    {
        return $stmt->execute();
    }

    function executeSelectQueryMSQL($stmt)
    {
        $stmt->execute();

        $meta = $stmt->result_metadata();
        while($field = $meta->fetch_field()){
            $params[] = &$row[$field->name];
        }

        call_user_func_array(array($stmt, 'bind_result'), $params);

        while($stmt->fetch()){
            foreach($row as $key => $val){
                $c[$key] = $val;
            }

            $resultset[] = $c;
        }

        $this->freeStatementSql($meta);

        if (!empty($resultset)) {
            return $resultset;
        } else {
            return "Aucune donnée à afficher !";
        }
    }

    function closeQuerySQL()
    {
        mysqli_close($this->conn);
    }

    function freeStatementSql($query)
    {
        mysqli_free_result($query);
    }
}
