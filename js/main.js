// aqui vou criar a variável DOM
var elapsedTime = document.querySelector('#elapsed');
var homeTeamLogo = document.querySelector('#homeLogo');
var homeTeamName = document.querySelector('#homeName');
var awayTeamLogo = document.querySelector('#awayLogo');
var awayTeamName = document.querySelector('#awayName');
var lastMatchGoals = document.querySelector('#goals');
var matchTable = document.querySelector('#matchTable');

// agora eu vou fazer uma função que irá construir os ladrilhos de jogo da interface do usuário
function addMatchTile(data) {
    // vamos criar o div de combinação
    var matchTile = document.createElement('div');
    matchTile.classList.add("match-tile"); // nos permitirá adicionar a classe ao div

    // criando a caixa do time da casa
    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");

    // criando a image e o nome do time da casa
    var homeTileLogo = document.createElement('img');
    var homeTileName = document.createElement('p');

    homeTileLogo.src = data['teams']['home']['logo'];
    homeTileName.innerHTML = data['teams']['home']['name'];

    // criando a caixa do time visitante
    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");

    // criando a image e o nome do time visitante
    var awayTileLogo = document.createElement('img');
    var awayTileName = document.createElement('p');

    awayTileLogo.src = data['teams']['away']['logo'];
    awayTileName.innerHTML = data['teams']['away']['name'];
    
    homeTeam.appendChild(homeTileLogo);
    homeTeam.appendChild(homeTileName);

    awayTeam.appendChild(awayTileLogo);
    awayTeam.appendChild(awayTileName);

    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " : " + data['goals']['away'];

    // anexar todo o elemento ao bloco de correspondência
    matchTile.appendChild(homeTeam);
    matchTile.appendChild(score);
    matchTile.appendChild(awayTeam);

    matchTable.appendChild(matchTile);
}


// agora vamos construir a função de busca
function getData() {
    // vamos obter os dados da API de futebol
    // verifique o site deles na descrição
    // leia a documentação para entender como usá-lo
    fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all', {
        "method": "GET",
        "headers": {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': 'fbcaff17ddmshe55444b8a680b47p1590f1jsnf43c9f46ebd6' //esta é a minha chave de API
        }
    })
        .then(response => response.json().then(data => {
            // agora vamos pegar nossos dados
            var matchesList = data['response'];
            // para esta parte irei obter as informações de que necessitarei para o projeto
            // certifique-se de ler o documento api ou você não conseguirá entender esta parte
            
            var fixture = matchesList[0]['fixture']; // eu vou pegar o primeiro jogo
            var goals = matchesList[0]['goals']; //  retorna os dados da meta
            var teams = matchesList[0]['teams']; // retorna os dados dos times

            // agora vamos renderizar os dados na página
            elapsedTime.innerHTML = fixture['status']['elapsed'] + "'";
            homeTeamLogo.src = teams['home']['logo'];
            homeTeamName.innerHTML = teams['home']['name'];
            awayTeamLogo.src = teams['away']['logo'];
            awayTeamName.innerHTML = teams['away']['name'];
            lastMatchGoals.innerHTML = goals['home'] + " : " + goals['away'];

            // agora vamos fazer um loop em nossos dados de resposta e renderizá-los
            for (var i = 1; i < matchesList.length; i++) {
                addMatchTile(matchesList[i]);
            }
        }))
        .catch(err => {
            console.log(err)
        })


}

getData();