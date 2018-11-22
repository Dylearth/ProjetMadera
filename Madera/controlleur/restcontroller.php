<?php
/**
 * Name: restcontroller.php
 * Author: LIGNEUL Dylan
 * Creation: 11/01/2018
 * Modification: 11/01/2018
 * Ce controller est le point d'entrée du web service. En fonction de l'url, il va renvoyer vers la fonction qui correspond, pour renvoyer les données à la page web.
 */

require_once('../php/handler.php');

if (isset($_GET["type"])) {
    $handler = new Handler();
    $response = $handler->HandlerController($_GET["type"]);
    echo ($response);
}
