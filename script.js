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



    let jovens = jogadores.filter(function(jogador){

        return jogador.categoria === "Jovem";

    });



    let veteranos = jogadores.filter(function(jogador){

        return jogador.categoria === "Veterano";

    });




    // Ordena pelo nível

    jovens.sort(function(a,b){

        return b.nivel - a.nivel;

    });


    veteranos.sort(function(a,b){

        return b.nivel - a.nivel;

    });





    let times=[];

    let pontos=[];

    let qtdJovens=[];

    let qtdVeteranos=[];



    for(let i=0;i<quantidadeTimes;i++){

        times.push([]);

        pontos.push(0);

        qtdJovens.push(0);

        qtdVeteranos.push(0);

    }





    // Função para colocar jogador no time mais equilibrado

    function distribuir(lista){


        lista.forEach(function(jogador){



            let escolhido=0;



            for(let i=1;i<quantidadeTimes;i++){


                if(pontos[i] < pontos[escolhido]){

                    escolhido=i;

                }

            }



            if(times[escolhido].length < jogadoresPorTime){


                times[escolhido].push(jogador);


                pontos[escolhido]+=jogador.nivel;



                if(jogador.categoria === "Jovem"){

                    qtdJovens[escolhido]++;

                }
                else{

                    qtdVeteranos[escolhido]++;

                }

            }


        });


    }




    // Primeiro distribui veteranos

    distribuir(veteranos);



    // Depois distribui jovens

    distribuir(jovens);





    // Jogadores que ficaram fora viram reservas

    let usados=[];


    times.forEach(function(time){


        time.forEach(function(jogador){


            usados.push(jogador);


        });


    });



    let reservas=jogadores.filter(function(jogador){


        return !usados.includes(jogador);


    });





    mostrarResultado(times,pontos,qtdJovens,qtdVeteranos,reservas);



}





// ==========================
// RESULTADO
// ==========================

function mostrarResultado(times,pontos,qtdJovens,qtdVeteranos,reservas){


    let resultado =
    document.getElementById("resultado");


    resultado.innerHTML="";



    times.forEach(function(time,index){


        let titulo=document.createElement("h3");


        titulo.innerHTML =
        "⚽ Time "+(index+1)+
        "<br>" +
        "Pontuação: "+pontos[index]+
        "<br>" +
        "Veteranos: "+qtdVeteranos[index]+
        " | Jovens: "+qtdJovens[index];


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