
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
function Abandon_adversaire(abandon_noir){
  if (abandon_noir == true ){
    alert('Vous avez gagné par abandon de votre adversaire!!')
  }
}


function envoyerDonnees (){
  var req =  creerInstance();
  var donneeClient =document.getElementById('test').value;
  var test_check = document.getElementById('Ab').checked;
  var test_PN = document.getElementById('Pnb').checked;
  var Abb= document.getElementById('Ablanc').value;
  var pnul =document.getElementById('PN').value;
  var rej_pn = document.getElementById('RPN').value;
  req.onreadystatechange = function(){
  if(req.readyState == 4){
    if(req.status == 200){
      a=req.responseText;
      console.log(a);
      a2 = a.split('--');
      console.log(a2);
      console.log(a2[1]);
      console.log(a2[0]);
      aj=JSON.parse(a2[0]);
      console.log(aj.histo[0]);

      if(aj.histo[0]!=null){
        console.log('cote'+aj.cote);

        console.log((aj.histo[0])[0]);
        var aj_modif = (lecture_histo(aj.histo[0])).split('--,--');
        console.log(aj_modif);}

      verification(aj);

      //Abandon_adversaire(".........................................");
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
  req.open("GET", "partie.php?donnees="+donneeClient+'&Abandon_blanc='+test_check+'&Partie_nulle_blanc='+test_PN+'&Abandon_blanc2='+Abb+'&Proposer_partie_nulle_blanc='+pnul+'&Rejeter_partie_nulle_blanc='+rej_pn, true);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send();
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

  var abandon = document.getElementById("fin_partie")
  var test_a = document.getElementById("Ablanc").value;
  if (test_a==""){
    console.log('3*********');
    document.getElementById("Ablanc").value='false';
  }

  abandon.addEventListener("click", function test_abandon(){

    console.log('1er test : '+document.getElementById("Ablanc").value);
  if (document.getElementById("Ablanc").value=='false'){
    console.log('1*****');
    document.getElementById("Ablanc").value= 'true';
  }else{
    console.log('2*****');
    document.getElementById("Ablanc").value= 'false';
  }console.log('2nd test : '+document.getElementById("Ablanc").value);},false);

  var partie_nulle = document.getElementById('partie_nulle');
  var test_pn = document.getElementById('PN').value;
  if (test_pn==''){
    test_pn = 'false';
  }
  partie_nulle.addEventListener("click", function test_abandon(){

    console.log('1er test : '+test_pn);
  if (document.getElementById('PN').value=='false'){
    console.log('1*****');
    document.getElementById('PN').value= 'true';
  }else{
    console.log('2*****');
    document.getElementById('PN').value= 'false';
  }console.log('2nd test : '+test_pn);},false);

  var rejet_pn = document.getElementById('Rejet');
  var rpn = document.getElementById('RPN').value;
  if (rpn ==''){
     document.getElementById('RPN').value = 'false';
  }
  rejet_pn.addEventListener("click", function test_abandon(){

    console.log('1er test : '+rpn);
  if ( document.getElementById('RPN').value=='false'){
    console.log('1*****');
     document.getElementById('RPN').value= 'true';
  }else{
    console.log('2*****');
     document.getElementById('RPN').value= 'false';
  }console.log('2nd test : '+rpn);},false);
  envoyerDonnees();
