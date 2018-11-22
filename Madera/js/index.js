$(document).ready(function() {

  //!function(a){a.fn.datepicker.dates.fr={days:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],daysShort:["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],daysMin:["d","l","ma","me","j","v","s"],months:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],monthsShort:["janv.","févr.","mars","avril","mai","juin","juil.","août","sept.","oct.","nov.","déc."],today:"Aujourd'hui",monthsTitle:"Mois",clear:"Effacer",weekStart:1,format:"dd/mm/yyyy"}}(jQuery);

$('input[name="dateCalendrier"]').daterangepicker({
  startDate: moment().subtract(7,'days').startOf('week').add(1,'days'),
       endDate: moment().subtract(7,'days').endOf('week').add(1,'days'),
  "locale": {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "fromLabel": "De",
        "toLabel": "à",
        "customRangeLabel": "Custom",
        "daysOfWeek": [
            "Dim",
            "Lun",
            "Mar",
            "Mer",
            "Jeu",
            "Ven",
            "Sam"
        ],
        "monthNames": [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre"
        ],
        "firstDay": 1
    }
});

    $("#GO").click(function(event) {
        var valide = 1;

        // Validation
        if ($("#comptFourni").val() == null) {
            valide = 0;
            $("#labelComptFourni").css({
                'color': 'red'
            });
        } else {
            $("#labelComptFourni").css({
                'color': 'black'
            });
        }
        if ($("#siteFourni").val() == null) {
            valide = 0;
            $("#labelSiteFourni").css({
                'color': 'red'
            });
        } else {
            $("#labelSiteFourni").css({
                'color': 'black'
            });
        }
        if ($("#ges").val() == null) {
            valide = 0;
            $("#labelGes").css({
                'color': 'red'
            });
        } else {
            $("#labelGes").css({
                'color': 'black'
            });
        }
        if ($("#ref").val() == null) {
            valide = 0;
            $("#labelRef").css({
                'color': 'red'
            });
        } else {
            $("#labelRef").css({
                'color': 'black'
            });
        }
        if ($("#dateCalendrier").val() == "") {
            valide = 0;
            $("#labelDateDebut").css({
                'color': 'red'
            });
        } else {
            $("#labelDateDebut").css({
                'color': 'black'
            });
        }



        if (valide == 1) {
            var buttonPeriode = document.getElementsByName('periode');

            // Store
            sessionStorage.setItem("ges", $("#ges").val());
            sessionStorage.setItem("ref", $("#ref").val());
            sessionStorage.setItem("comptFourni", $("#comptFourni").val());
            sessionStorage.setItem("siteFourni", $("#siteFourni").val());
            sessionStorage.setItem("dateCalendrier", $("#dateCalendrier").val());

            for (var i = 0; i < buttonPeriode.length; i++) {
                if (buttonPeriode[i].checked) {
                    sessionStorage.setItem("periode", buttonPeriode[i].value);
                }
            }

            // Affichage des graphiques
            location.href = "affichageTSF.html";
        } else {
            alert("Des options ne sont pas remplies !!");
        }

    });

$('input[name=critere]').change (function()
{
    $('.divCritere').css("display","none");
  if($(this).val()=="CompteFournisseur")
  {
    $('#divComptF').css("display","block");
  }
  if($(this).val()=="SiteFournisseur")
  {
    $("#divSiteF").css("display","block");

  }
  if($(this).val()=="Gestionnaire")
  {
    $('#divGes').css("display","block");
  }
  if($(this).val()=="Référence")
  {
    $('#divRef').css("display","block");
  }
});

    //Liste des fournisseurs générée en Ajax
    $.ajax({
        type: "POST",
        url: "data/selectcomptFourni",
        success: function(output) {
          if(output != "Aucune donnée à afficher !"){
          //  $('#comptFourni').html(output);
            document.getElementById("comptFourni").innerHTML =output;
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert("Erreur"+xhr.status + " " + thrownError);
        }
    });

    //Liste des références générée en Ajax
    $.ajax({
        type: "POST",
        url: "data/selectReference",
        success: function(output) {
          if(output != "Aucune donnée à afficher !"){
          //  $('#comptFourni').html(output);
            document.getElementById("ref").innerHTML =output;
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert("Erreur"+xhr.status + " " + thrownError);
        }
    });

  //Liste des gestionnaires générée en Ajax
  $.ajax({
      type: "POST",
      url: "data/selectGestionnaire",
      success: function(output) {
        if(output != "Aucune donnée à afficher !"){
        //  $('#comptFourni').html(output);
          document.getElementById("ges").innerHTML =output;
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
          alert("Erreur"+xhr.status + " " + thrownError);
      }
  });

//Liste des sites fournisseurs générée en Ajax
$.ajax({
    type: "POST",
    url: "data/selectSitesFourn",
    success: function(output) {
      if(output != "Aucune donnée à afficher !"){
      //  $('#comptFourni').html(output);
        document.getElementById("siteFourni").innerHTML =output;
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
        alert("Erreur"+xhr.status + " " + thrownError);
    }
});

});


function validate() {

    var valide = 1;

    // Validation
    if ($("#comptFourni").val() == null) {
        valide = 0;
        $("#labelComptFourni").css({
            'color': 'red'
        });
    } else {
        $("#labelComptFourni").css({
            'color': 'black'
        });
    }
    if ($("#siteFourni").val() == null) {
        valide = 0;
        $("#labelSiteFourni").css({
            'color': 'red'
        });
    } else {
        $("#labelSiteFourni").css({
            'color': 'black'
        });
    }
    if ($("#ges").val() == null) {
        valide = 0;
        $("#labelGes").css({
            'color': 'red'
        });
    } else {
        $("#labelGes").css({
            'color': 'black'
        });
    }
    if ($("#ref").val() == null) {
        valide = 0;
        $("#labelRef").css({
            'color': 'red'
        });
    } else {
        $("#labelRef").css({
            'color': 'black'
        });
    }

    if ($("#dateCalendrier").val() == "") {
        valide = 0;
        $("#labelDateDebut").css({
            'color': 'red'
        });
    } else {
        $("#labelDateDebut").css({
            'color': 'black'
        });
    }

    if (valide == 1) {
        return true;

    } else {
        alert("Des options ne sont pas remplies !");
        return false;
    }

}
