function Node(grid_size, parent, distance, x, y) {
    this.parent = parent;
    this.distance = distance;
    this.x = x;
    this.y = y;
    this.grid_pos = [x,y];
    this.screen_pos = [x * grid_size, y * grid_size];
}

Node.prototype.setState = function (new_state) {
    switch (new_state) {
        case "Comeco":
            fill(0, 200, 0);
            this.distance = 0;
            posicao_inicial = [this.x, this.y];
            comeco_existe = true;
            break;
        case "Fim":
            fill(200, 0, 0);
            fim_existe = true;
            break;
        case "Vazio":
            fill(200, 200, 200);
            break;
        case "Visitado":
            try {
                fill(50 + this.distance, 10, 200);
            } catch {
                fill(255, 10, 200);
            }
            break;
        case "Muro":
            fill(150, 150, 150);
            break;
        case "muroFixo":
            fill(30, 15, 15);
            break;
        case "NodeAtual":
            fill(255, 0, 255);
            break;
        case "Tentativa":
            fill(204, 102, 0);
            break;
        case "Caminho":
            fill(255, 255, 0);
            break;
    }
    rect(this.screen_pos[0], this.screen_pos[1], grid_size);
    this.state = new_state
}

Node.prototype.vizinhos = function () {
    top_left =      grid[this.x - 1] [this.y - 1];
    up =            grid[this.x][this.y - 1];
    top_right =     grid[this.x + 1] [this.y - 1];
    right =         grid[this.x + 1] [this.y];
    bot_right =     grid[this.x + 1] [this.y + 1];
    bottom =        grid[this.x]     [this.y + 1];
    bot_left =      grid[this.x - 1] [this.y + 1];
    left =          grid[this.x - 1] [this.y];

    return [up, bottom, left, right, top_left, top_right, bot_right, bot_left];
}