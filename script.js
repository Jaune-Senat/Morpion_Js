
// j'initie toutes les variables dont j'aurais besoin
function init(playerToBegin){
    game_over = false
    tour = 0
    current = playerToBegin
    document.querySelector("#"+current).classList.toggle("activePlayer")
    symbole = ["cross", "circle"]
    cases = document.querySelectorAll(".cell")
    score_j1 = document.querySelector("#player1")
    score_j2 = document.querySelector("#player2")
    for(let element of cases){
        element.classList.remove("cross", "circle")
    }
}
// je stocke la liste des cases, le nombre de tour, et un tableau des symboles dans des variables
let tour, game_over, symbole, cases, score_j1, score_j2, current
let winCase = {
    cond_one :[0,1,2],
    cond_two :[3,4,5],
    cond_three :[6,7,8],
    cond_four :[0,3,6],
    cond_five :[1,4,7],
    cond_six :[2,5,8],
    cond_seven :[0,4,8],
    cond_eight :[2,4,6]
}
init("cross")
console.log(tour%2+1)
// en bouclant sur la liste des cases, j'ajoute un évènement SI la case est vide
for (let element of cases){
    element.addEventListener("click", Event =>{
        // si la case est vide, je place un symbole en fonction du tour de jeu
        if(element.classList.length == 1 && !game_over){        
            element.classList.add(current)
            let arr = Array.from(cases)
            // je parcours un tableau de condition de victoires et je compare avec les cases remplies
            for(pattern in winCase){
                let pos = winCase[pattern]
                if(arr[pos[0]].classList.contains(current) && arr[pos[1]].classList.contains(current) && arr[pos[2]].classList.contains(current)){
                   // je met un alerte pour déclarer la victoire et passer la variable de victoire à "true"
                    game_over = true
                    if(current == "cross"){
                        score_j1.innerHTML++
                        alert("Victoire pour le joueur 1 !")
                    }else{
                        score_j2.innerHTML++
                        alert("Victoire pour le joueur 2 !")
                    }
                }
            }
            tour++
            // je rajoute une condition permettant au perdant de commencer
            current = (current == "cross") ? "circle" : "cross"
            // je met en place une règle permettant de mettre une couleur au joueur qui doit jouer
            //document.querySelector("#"+current).classList.toggle("activePlayer")
            // si à la fin du tour 9 il n'y a toujours aucun vainqueur, on déclare le match nul
            if(tour>8 && game_over == false){
                alert("Match nul !")
                game_over = true
            }
        }
    })
}
// je permets à un boutton de nettoyer le plateau et de recommencer à jouer
let button = document.querySelector("#button")
button.addEventListener("click", Event =>{
       init(current)
})