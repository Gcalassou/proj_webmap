
var num_test=0;
var test_ok=0;
var historique = "[]";
var compteur=0;
var data;

function creerInstance(){
  if(window.XMLHttpRequest){
    return new XMLHttpRequest();
  }else if(window.ActiveXObject){
    var names = [
      "Msxml2.XMLHTTP.6.0",
      "Msxml2.XMLHTTP.3.0",
      "Msxml2.XMLHTTP",
      "Microsoft.XMLHTTP"];
    for(var i in names){
      try{ return new ActiveXObject(names[i]); }
      catch(e){}
    }
    alert("Non supporte");
    return null; // non supporté
  }
};
function lecture_histo(historique){
  i=1;
  var re1 = new RegExp('"{', 'gi');
  var re2 = new RegExp('}"', 'gi');
  historique = historique.replace(re1, '--{');
  historique = historique.replace(re2, '}--');
  // while (i<historique.length-1) {
  //   rep1=new RegExp('[àâä]', 'gi');
  //     if (historique[i]=='{'){
  //       var remove = historique.splice(i-1,1);
  //
  //
  //     }
  //     if (historique[i]=='}'){
  //       var remove = historique.splice(i+1,1);
  //
  //     }
  //     i+=1;
  //
  //   }
    return historique
  }


function envoyerDonnees (){
  var req =  creerInstance();
  var donneeClient =document.getElementById('test').value;
  req.onreadystatechange = function(){
  if(req.readyState == 4){
    if(req.status == 200){
      a=req.responseText;
      console.log(a);
      aj=JSON.parse(a);
      console.log('cote'+aj.cote);
      verification(aj);
      console.log((aj.histo[0])[0]);
      var aj_modif = (lecture_histo(aj.histo[0])).split('--,--');
      console.log(aj_modif);

      // console.log(aj_modif);
      //  console.log(JSON.parse(aj_modif));
      num_test+=1;
      // console.log("num_test : "+num_test);
      if(aj.cote!=1){
      relance = setTimeout(envoyerDonnees, 1000*Math.pow(2,num_test));
    }else {
      console.log('cote'+aj.cote);
      alert(aj_modif[aj_modif.length-1]);
      alert('A votre tour!!!');
    }
    document.getElementById('test').value='';
    }else{
      alert("Error: returned status code " + req.status + " " + req.statusText);
    }
  }
}
  req.open("GET", "partie.php?donnees="+donneeClient, true);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send(null);
}
function verification(game){
  console.log(1*Math.pow(2,num_test));
  console.log("verif : "+num_test);
  num_test+=1;
  test_ok=0;
  console.log("historique : "+historique);
  console.log("histo : "+JSON.stringify(game.histo));
  if (JSON.stringify(game.histo) == historique){
    console.log({ras:game.cote});

  }else{
    console.log('TRUE');

    // console.log(game.histo[game.histo.length-1]);
    // console.log(game.histo.length);
    // console.log(JSON.parse(game.histo));
    historique= JSON.stringify(game.histo);
    // console.log("historique : "+historique.length);
    // console.log("histo : "+game.histo.length);
    // num_test=0;
  }

}
function validation(){
  if (test_ok==0){
//  clearTimeout(relance);
  num_test=0;
  console.log('manuel : '+num_test);
  test_ok =1;
  setTimeout(envoyerDonnees,5000);}
}

function verif_manuelle(){
  clearTimeout(relance);
  num_test=0;
  console.log('manuel : '+num_test);
  test_ok =1;
  setTimeout(envoyerDonnees,5000);
}
var test_client= document.getElementById("debut");
test_client.addEventListener("click", function test(){
  console.log("test : "+test_ok);
  if (test_ok==0){
  verif_manuelle();}},false);

  envoyerDonnees();
