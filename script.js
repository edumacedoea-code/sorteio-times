let jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];

mostrarJogadores();


// ==========================
// CADASTRO / EDIÇÃO
// ==========================

function adicionarJogador(){

    let nome = document.getElementById("nomeJogador").value;

    let categoria = document.getElementById("categoriaJogador").value;

    let nivel = Number(document.getElementById("nivelJogador").value);

    let indice = document.getElementById("indiceEdicao").value;


    if(nome.trim() === ""){

        alert("Digite o nome do jogador!");

        return;

    }


    let jogador = {

        nome:nome,
        categoria:categoria,
        nivel:nivel

    };


    if(indice !== ""){

        jogadores[indice] = jogador;

        document.getElementById("indiceEdicao").value = "";

        document.getElementById("botaoSalvar").innerHTML =
        "Adicionar jogador";

    }
    else{

        jogadores.push(jogador);

    }


    salvarJogadores();

    mostrarJogadores();

    limparFormulario();

}





// ==========================
// SALVAR
// ==========================

function salvarJogadores(){

    localStorage.setItem(
        "jogadores",
        JSON.stringify(jogadores)
    );

}





// ==========================
// LISTA DE JOGADORES
// ==========================

function mostrarJogadores(){

    let lista = document.getElementById("listaJogadores");

    let contador = document.getElementById("contadorJogadores");


    lista.innerHTML = "";

    contador.innerHTML = jogadores.length;



    jogadores.forEach(function(jogador,index){


        let item = document.createElement("li");


        item.innerHTML =

        jogador.nome +
        " - " +
        jogador.categoria +
        " - " +
        "⭐".repeat(jogador.nivel)

        +

        `

        <div class="acoes">

        <button class="btn-editar" onclick="editarJogador(${index})">
        ✏️ Editar
        </button>


        <button class="btn-remover" onclick="removerJogador(${index})">
        ❌ Remover
        </button>

        </div>

        `;


        lista.appendChild(item);


    });


}




function editarJogador(index){

    let jogador = jogadores[index];


    document.getElementById("nomeJogador").value =
    jogador.nome;


    document.getElementById("categoriaJogador").value =
    jogador.categoria;


    document.getElementById("nivelJogador").value =
    jogador.nivel;


    document.getElementById("indiceEdicao").value =
    index;


    document.getElementById("botaoSalvar").innerHTML =
    "Salvar edição";


}





function removerJogador(index){

    jogadores.splice(index,1);

    salvarJogadores();

    mostrarJogadores();

}





function limparJogadores(){

    if(confirm("Apagar todos os jogadores?")){

        jogadores=[];

        salvarJogadores();

        mostrarJogadores();

    }

}





function limparFormulario(){

    document.getElementById("nomeJogador").value="";

    document.getElementById("categoriaJogador").value="Jovem";

    document.getElementById("nivelJogador").value="1";

}





// ==========================
// SORTEIO EQUILIBRADO
// ==========================

function sortearTimes(){


    let quantidadeTimes =
    Number(document.getElementById("quantidadeTimes").value);


    let jogadoresPorTime =
    Number(document.getElementById("jogadoresPorTime").value);



    if(jogadores.length === 0){

        alert("Cadastre jogadores antes!");

        return;

    }



    let lista = [...jogadores];


    lista.sort(function(a,b){

        return b.nivel - a.nivel;

    });



    let times=[];

    let pontos=[];



    for(let i=0;i<quantidadeTimes;i++){

        times.push([]);

        pontos.push(0);

    }




    lista.forEach(function(jogador){


        let menor=0;


        for(let i=1;i<quantidadeTimes;i++){

            if(pontos[i] < pontos[menor]){

                menor=i;

            }

        }



        if(times[menor].length < jogadoresPorTime){

            times[menor].push(jogador);

            pontos[menor]+=jogador.nivel;

        }


    });



    mostrarResultado(times,pontos);


}





// ==========================
// RESULTADO
// ==========================

function mostrarResultado(times,pontos){


    let resultado =
    document.getElementById("resultado");


    resultado.innerHTML="";



    times.forEach(function(time,index){


        let titulo=document.createElement("h3");


        titulo.innerHTML =
        "Time "+(index+1)+
        " - Pontuação: "+
        pontos[index];


        resultado.appendChild(titulo);



        let lista=document.createElement("ul");


        time.forEach(function(jogador){


            let item=document.createElement("li");


            item.innerHTML =
            jogador.nome+
            " - "+
            jogador.categoria+
            " - "+
            "⭐".repeat(jogador.nivel);



            lista.appendChild(item);


        });


        resultado.appendChild(lista);



    });


}