//table Hockey PlayStation 2
var osdfnt = new Font(); 
var font = new Font("fonts/LEMONMILK-Regular.otf");  
let canvas = Screen.getMode();
canvas.width = 640;
canvas.height  = 448;
Screen.setMode(canvas)
const imagepath = "Image/"
const colors = {
  Black:Color.new(0,0,0),
  White:Color.new(255,255,255),
  BlueDark:Color.new(23,27,255),
  Blue:Color.new(48,92,255)
};
const MenuImage = {
  menu:new Image(imagepath+"Menu.png"),
  play:new Image(imagepath+"play.png"),
  settings:new Image(imagepath+"settings.png"),
  credits:new Image(imagepath+"credits.png"),
  seta:new Image(imagepath+"seta.png")
};
const GameImage = {
  bg:new Image(imagepath+"bg.png"),
  ball:new Image(imagepath+"ball.png"),
  red:new Image(imagepath+"red.png"),
  blue:new Image(imagepath+"blue.png")
  
}
const Black = Color.new(0,0,0);
font.color = Black;
var screen = 0;
var Players = {Player1:[{X:569,Y:195}],Player2: [{X:13,Y:195}]};
var Ball = {X:306,Y:124};
let new_pad = Pads.get();
let old_pad = new_pad;
let pd = Pads.get();
let pd2 = Pads.get();
var velocidade = 4;
var seta = {
  x: 388,
  y: 266,
  slot0: [
    {
      x: 388,
      y: 266
    }
  ],
  slot1: [
    {
      x: 414,
      y: 321
    }
  ],
  slot2: [
    {
      x: 401,
      y: 377
    }
  ]
};
var Count = 3;
var selected = 0;
class main {
  SetScreen() {
    if(screen == 0) {
      this.Menu()
    }
    if(screen == 1) {
      this.Play()
    }
  }
  MoveSetaUp() {
    if(selected == 0) {
      selected = 2;
      seta.x = seta.slot2[0].x;
      seta.y = seta.slot2[0].y;
    }
    else if(selected == 1) {
      selected = 0; 
      seta.x = seta.slot0[0].x;
      seta.y = seta.slot0[0].y;
    }
    else if(selected == 2) {
      selected = 1; 
      seta.x = seta.slot1[0].x;
      seta.y = seta.slot1[0].y;
    }
  }
  MoveSetaDown() {
    if(selected == 0) {
      selected = 1;
      seta.x = seta.slot1[0].x;
      seta.y = seta.slot1[0].y;
    }
    else if(selected == 1) {
      selected = 2; 
      seta.x = seta.slot2[0].x;
      seta.y = seta.slot2[0].y;
    }
    else if(selected == 2) {
      selected = 0; 
      seta.x = seta.slot0[0].x;
      seta.y = seta.slot0[0].y;
    } 
    }
  Menu() {
    old_pad = new_pad;
    new_pad = Pads.get();
    if(Pads.check(new_pad, Pads.UP) && !Pads.check(old_pad, Pads.UP)) {
      this.MoveSetaUp()
    }
    if(Pads.check(new_pad, Pads.DOWN) && !Pads.check(old_pad, Pads.DOWN)) {
      this.MoveSetaDown()
    }
    if(Pads.check(new_pad, Pads.CROSS) && !Pads.check(old_pad, Pads.CROSS) && selected == 0) {
      screen = 1;
      }
      MenuImage.menu.draw(0,0);
      MenuImage.play.draw(259,254);
      MenuImage.settings.draw(234,310);
      MenuImage.credits.draw(243,367);
      MenuImage.seta.draw(seta.x,seta.y);
  }
  Movep1() {
    pd = Pads.get();
    if(pd.rx < -50) {
      Players.Player1[0].X = Players.Player1[0].X - velocidade;
    }
    if(pd.rx > 50) {
      Players.Player1[0].X = Players.Player1[0].X + velocidade;
    }
    if(pd.ry > 50) {
      Players.Player1[0].Y = Players.Player1[0].Y + velocidade;
    }
    if(pd.ry < -50) {
      Players.Player1[0].Y = Players.Player1[0].Y - velocidade;
    }
  }
  Movep2() {
    pd2 = Pads.get();
    if(pd2.lx < -50) {
      Players.Player2[0].X = Players.Player2[0].X - velocidade;
    }
    if(pd2.lx > 50) {
      Players.Player2[0].X = Players.Player2[0].X + velocidade;
    }
    if(pd2.ly > 50) {
      Players.Player2[0].Y = Players.Player2[0].Y + velocidade;
    }
    if(pd2.ly < -50) {
      Players.Player2[0].Y = Players.Player2[0].Y - velocidade;
    }
  }
  ColisionWall() {
    //player1
    if(Players.Player1[0].X < 321) {//meio
      Players.Player1[0].X = 321;
    }
    if(Players.Player1[0].Y > 378) { //baixo
      Players.Player1[0].Y = 378;
    }
    if(Players.Player1[0].Y < 10) { //cima
      Players.Player1[0].Y = 10;
    }
    if(Players.Player1[0].X > 567) { //fim direita
      Players.Player1[0].X = 567;
    }
    //player 2
  if(Players.Player2[0].X > 256) { //meio
      Players.Player2[0].X = 256;
    }
  if(Players.Player2[0].Y > 378) { //baixo
      Players.Player2[0].Y = 378;
    }
  if(Players.Player2[0].Y < 10) { //baixo
      Players.Player2[0].Y = 10;
    }
  if(Players.Player2[0].X < 10) { //fim esquerda
      Players.Player2[0].X = 10;
    }
    //Bola 
    
    }
  draw() {
    GameImage.bg.draw(0,0);
    Draw.circle(Ball.X, Ball.Y, 20, colors.Black, true);
    GameImage.red.draw(Players.Player1[0].X,Players.Player1[0].Y);
    GameImage.blue.draw(Players.Player2[0].X,Players.Player2[0].Y);
  }
  start() {
    old_pad = new_pad;
    new_pad = Pads.get(0);
    if(Pads.check(new_pad, Pads.START) && !Pads.check(old_pad, Pads.START) && selected == 0) {
      screen = 0;
    }
  }
  
  
  CollisionBall() {
    //Continuar
    font.print(0, 0, "test")
    
  }
  Play() {
    this.start();
    this.Movep1();
    this.Movep2();
    this.CollisionBall();
    this.ColisionWall();
    this.draw();
  }
} 
const Game = new main();
os.setInterval(() => {
  Screen.clear();
  Game.SetScreen();
  Screen.waitVblankStart();
  Screen.flip();
},0);