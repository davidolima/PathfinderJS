const s_width = 1200;
const s_height = 500;
const grid_size = 20;
let fim_existe = false;
let comeco_existe = false;
let posicao_inicial;
let grid = [];
let objetos_na_tela = 0;
let searching = false;

function setup() {
    createCanvas(s_width, s_height);
    background(220);
    criarGrade();
}

function iniciarBusca(){
    if(comeco_existe && fim_existe){
        let procura_futura = new Array;
        searching = true;
        console.log("Iniciando Procura...");

        node_inicial = grid[posicao_inicial[0]][posicao_inicial[1]]
        vizinhos_iniciais = node_inicial.vizinhos();

        for(i = 0; i < vizinhos_iniciais.length; i++){
            vizinho = vizinhos_iniciais[i];
            if (vizinho == undefined || vizinho.state == 'muroFixo' || vizinho.state == 'Muro'){
                continue;
            }
            vizinho.setState('Tentativa');
            vizinho.parent = node_inicial;
            vizinho.distance = 1;
            procura_futura.push(vizinho);
        }

        while(searching){
            procura_atual = procura_futura;
            procura_futura = [];
            for (i = 0; i < procura_atual.length; i++){
                node = procura_atual[i];
                vizinhos = node.vizinhos();
                for (j = 0; j <vizinhos.length; j++){
                    vizinho = vizinhos[j];
                    if (vizinho == undefined){
                        continue
                    }
                    if (vizinho.state == 'Vazio'){
                        vizinho.parent = node;
                        vizinho.setState("Tentativa");
                        vizinho.distance = node.distance + 1;
                        procura_futura.push(vizinho);
                        node.setState('Visitado');
                    } else if (vizinho.state == 'Fim'){
                        searching = false;
                        procura_atual = [];
                        vizinho.distance = node.distance + 1;
                        vizinho.parent = node;
                        console.log('Fim:', vizinho.grid_pos);
                        gerarCaminho(vizinho);
                    } else {
                        continue;
                    }
                }
            }
        }
    }
}

function gerarCaminho(node){
    let parent = node.parent;
    for (i = 0; i < node.distance; i++){
        if (parent != undefined){
            parent.setState('Caminho');
            parent = parent.parent;
        }
        if (parent.state == "Comeco"){
            break;
        }
    }
}

function gerarObstaculos(){
    for (i = 0; i < 50; i++){
        randXY = [floor(random(1,s_width/grid_size)),floor(random(1,s_height/grid_size))];
        randXYNode = grid[randXY[0]][randXY[1]];
        if (randXYNode != undefined && randXYNode.state == "Vazio"){
            randXYNode.setState('Muro');
        }
    }
}

function criarGrade() {
    for (i = 0; i < (s_width / grid_size); i++) {
        column = new Array;
        for (let j = 0; j < (s_height / grid_size); j++) {
            new_node = new Node(grid_size, null, Infinity, i, j);
            if (i == 0 || i == s_width/grid_size-1 || j == 0 || j == s_height/grid_size-1){
                new_node.setState('muroFixo');
            } else {
                new_node.setState('Vazio');
            }
            column.push(new_node)
            objetos_na_tela += 1;
        }
        grid.push(column);
    }
}

function draw() {
    if (mouseIsPressed){
        mouseClicked()
    }
}

function mouseClicked() {
    if (mouseX > s_width || mouseY > s_height){
        return;
    }
    chosen_node = grid[floor(mouseX / grid_size)][floor(mouseY / grid_size)];
    if (chosen_node.x < (mouseX / grid_size) && (mouseX / grid_size) < (chosen_node.x + grid_size)) {
        if(chosen_node.y < (mouseY / grid_size) && (mouseY / grid_size) < (chosen_node.y + grid_size)) {
            console.log('chosen_node:', chosen_node.x, chosen_node.y,
                        'State:', chosen_node.state);

            if (comeco_existe == false && fim_existe == false && chosen_node.state == "Vazio"){
                chosen_node.setState("Comeco");
            } else if (comeco_existe == true && fim_existe == false && chosen_node.state == "Vazio"){
                chosen_node.setState("Fim");
            } else if (chosen_node.state == 'Vazio'){
                chosen_node.setState("Muro");
            }
        }
    }
}

function keyPressed(){
    if (searching == false){
        if(keyCode === RETURN){
            iniciarBusca();
        } else if(keyCode === BACKSPACE){
            gerarObstaculos();
        }
    }
}
