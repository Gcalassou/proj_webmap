<?php
  // Pour libérer le port 80 et activer wamp
  // taper dans le cmd "net stop WAS"
  $p=[];

  $mes;
  $mes2;
  // $mes=10;
  $tralala= 1;

  $partie=1;
  $cote=0;
  //$test2='{"je_joue":[4,8,4,5],"vues":[[3,4],[2,3],[1,2,"p"],[5,4],[6,3],[7,2,"p"]]}';
  // $histo=[];
  function hist($fichier, $tour_jeu, $trait){
    $histo=fgetss($fichier);
    $tralala=1;
    if ($histo=='') {
      $histo1 = [];
    }
    else{
    $histo1=[$histo];}
    if ($tour_jeu==1) {
      $mes=$_GET["donnees"];
      if ($trait==1){
      $coups = '{"je_joue":"'.$mes.'","vue":'.$tralala.'}';}
      elseif ($trait==2){
        $coups = '{"il_joue":"'.$mes.'","vue":'.$tralala.'}';
      }}
    if ($tour_jeu==2){
      $mes2=$_GET["donnees2"];
      if ($trait==1){
        $coups = '{"il_joue":"'.$mes2.'","vue":'.$tralala.'}';
      }
      elseif ($trait==2) {
        $coups = '{"je_joue":"'.$mes2.'","vue":'.$tralala.'}';
      }
    }
    $histo1[]=$coups;
    if ($tour_jeu==1){$tour_jeu=2;}
    else if ($tour_jeu==2){$tour_jeu=1;}
    $new_test='{"tour":4,"cote":'.$tour_jeu.',"histo":'.json_encode($histo1).'}';
      fseek($fichier, 0); // On remet le curseur au début du fichier
      for ($i=0; $i<sizeof($histo1);$i++){
        if ($i==0){
          fputs($fichier,$histo1[$i]);
        }else{
          fputs($fichier,'","'.$histo1[$i]);
        }
      }
    return $new_test;}

  $monfichier = fopen('test.sql', 'r+');
  $histo_test = fgetss($monfichier);
  fseek($monfichier, 0); // On remet le curseur au début du fichier
  $cote=$histo_test[0];
  $fichier_blanc= fopen('historique_blanc.sql', 'r+');
  $fichier_noir= fopen('historique_noir.sql', 'r+');
  if ($cote==1){
    if (isset($_GET["donnees"])){
      if ($_GET["donnees"]!=''){


      //$historique_blanc = fgetss($fichier_blanc);
      $test_blanc=hist($fichier_blanc,$cote,1);
      hist($fichier_noir,$cote,2);
      $cote=2;
      // fseek($fichier_blanc, 0);
      // fputs($fichier_blanc,$coups_blanc);

      echo $test_blanc;}
      else{

        $histo_blanc=fgetss($fichier_blanc);
        if ($histo_blanc=='') {
          $histo_blanc_2 = [];
        }
        else{
        $histo_blanc_2=[$histo_blanc];}
        $new_test='{"tour":4,"cote":'.$cote.',"histo":'.json_encode($histo_blanc_2).'}';
        //hist($fichier_noir,$cote,2);
        echo $new_test;
      }
    }
    else{
      $histo_noir=fgetss($fichier_noir);
      $cote=2;
      if ($histo_noir=='') {
        $histo_noir_2 = [];
      }
      else{
      $histo_noir_2=[$histo_noir];}
      $new_test='{"tour":4,"cote":'.$cote.',"histo":'.json_encode($histo_noir_2).'}';
      //hist($fichier_noir,$cote,2);
      echo $new_test;
    }
  }else{
    if (isset($_GET["donnees2"])){
      if ($_GET["donnees2"]!=''){

    //$coups = '{"je_joue":"'.$mes2.'","vue":'.$tralala.',"cote":'.$cote.'}';
    $test2=hist($fichier_noir,$cote,2);
    hist($fichier_blanc,$cote,1);
    //$cote=1;
    echo $test2;
  }
    else{
      $histo_noir=fgetss($fichier_noir);
      if ($histo_noir=='') {
        $histo_noir_2 = [];
      }
      else{
      $histo_noir_2=[$histo_noir];}
      $new_test='{"tour":4,"cote":'.$cote.',"histo":'.json_encode($histo_noir_2).'}';
      //hist($fichier_noir,$cote,2);
      echo $new_test;
    }
  }
    else{
      $histo_blanc=fgetss($fichier_blanc);
      //$cote=1;
      if ($histo_blanc=='') {
        $histo_blanc_2 = [];
      }
      else{
      $histo_blanc_2=[$histo_blanc];}
      $new_test='{"tour":4,"cote":'.$cote.',"histo":'.json_encode($histo_blanc_2).'}';
      //hist($fichier_noir,$cote,2);
      echo $new_test;
    }
  }
  fclose($fichier_blanc);
  fclose($fichier_noir);
  fputs($monfichier,$cote);
  fclose($monfichier);


  // $monfichier = fopen('test.sql', 'r+');
  // $histo = fgetss($monfichier);


  //fclose($monfichier);

  // $test='{"tour":4,"trait":1,"cote":1,"histo":[{"coups":[[2,1,1,3],[2,1,3,3],[7,1,6,3],[7,1,8,3],[1,2,1,3],[2,2,2,3],[3,2,3,3],[4,2,4,3],[5,2,5,3],[6,2,6,3],[7,2,7,3],[8,2,8,3],[1,2,1,4],[2,2,2,4],[3,2,3,4],[4,2,4,4],[5,2,5,4],[6,2,6,4],[7,2,7,4],[8,2,8,4]]},{"je_joue":[4,2,4,4],"vues":[[3,5],[4,5],[5,5]]},{"nature":"p","il_joue":[0,0,4,5],"coups":[[2,1,1,3],[2,1,3,3],[2,1,4,2],[7,1,6,3],[7,1,8,3],[1,2,1,3],[2,2,2,3],[3,2,3,3],[5,2,5,3],[6,2,6,3],[7,2,7,3],[8,2,8,3],[1,2,1,4],[2,2,2,4],[3,2,3,4],[5,2,5,4],[6,2,6,4],[7,2,7,4],[8,2,8,4],[3,1,4,2],[3,1,5,3],[3,1,6,4],[3,1,7,5],[3,1,8,6],[4,1,4,2],[4,1,4,3],[5,1,4,2]]},{"je_joue":[2,1,3,3],"vues":[[2,5]]},{"il_joue":[0,0,0,0],"coups":[[3,3,2,1],[3,3,1,4],[3,3,2,5],[3,3,4,5,"p"],[3,3,5,4],[7,1,6,3],[7,1,8,3],[1,2,1,3],[2,2,2,3],[5,2,5,3],[6,2,6,3],[7,2,7,3],[8,2,8,3],[1,2,1,4],[2,2,2,4],[5,2,5,4],[6,2,6,4],[7,2,7,4],[8,2,8,4],[3,1,4,2],[3,1,5,3],[3,1,6,4],[3,1,7,5],[3,1,8,6],[4,1,4,2],[4,1,4,3],[5,1,4,2]]},{"je_joue":[3,3,4,5],"vues":[[2,6],[3,7,"p"],[5,7,"p"],[6,6]]},{"nature":"D","il_joue":[0,0,4,5],"coups":[[3,3,2,1],[3,3,1,4],[3,3,2,5],[3,3,4,5,"D"],[3,3,5,4],[7,1,6,3],[7,1,8,3],[1,2,1,3],[2,2,2,3],[3,2,3,3],[5,2,5,3],[6,2,6,3],[7,2,7,3],[8,2,8,3],[1,2,1,4],[3,2,3,4],[5,2,5,4],[6,2,6,4],[7,2,7,4],[8,2,8,4],[3,1,4,2],[3,1,5,3],[3,1,6,4],[3,1,7,5],[3,1,8,6],[4,1,4,2],[4,1,4,3],[5,1,4,2]]}]}';
  //
  // echo $new_test;
  // echo "donnees recues: ".$_GET["donnees"];


?>
