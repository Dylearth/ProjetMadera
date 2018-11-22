<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=utf-8');
setlocale (LC_TIME, 'fr_FR.utf8','fra');
/**
 * Name: handler.php
 * Author: LIGNEUL Dylan
 * Creation: 22/11/2018
 * Modification: 11/01/2018
 * Ce handler d�coupe l'url et les parametres post et redirige vers la bonne fonction.
 */

require_once '../controlleur/dbcontroller.php';

/**
 * Class Handler
 */
class Handler
{
    // Ce controller prend en paramètres le type de données que l'on souhaite récupérer
    // Il va lancer la fonction qui correspond et renvoyer le json au fichier restcontroller.
    /**
     * @param $type
     * @return string
     */
    function HandlerController($type) {

        switch ($type) {
          case "selectClients":
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $result = $this->selectcomptFourni();
            }
            break;

            case "selectCommerciaux":
              if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                  $result = $this->generationTableau();
              }
              break;

              case "insertDevis":
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $result = $this->selectReference();
                }
                break;
              
            }
            return $result;
          }


function selectClients(){
       $dbcontroller = new DBController();

        $stmt = mysqli_prepare($dbcontroller->getConn(), "SELECT ");
        $data = $dbcontroller->executeSelectQueryMSQL($stmt);

        $dbcontroller->closeQuerySQL();
        $i=0;
        $response='';
        while($i < count($data)){
            $response = $response.'<option id="idCompteFourni'.$data[$i]["id_fournisseur"].'" value="'.$data[$i]["compteFournisseur"].'">'.$data[$i]["compteFournisseur"].'</option>';
            $i++;
        }

    return $response;
}
  }
