const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const CANVAS_BORDER_COLOR = 'rgb(0, 0, 0)';

const TARGET_FILL_COLOR = 'rgb(255, 0, 0)';
const TARGET_OUTLINE_COLOR = 'rgb(0, 0, 0';
const TARGET_SPEED_LOWER_BOUND = 0;
const TARGET_SPEED_UPPER_BOUND = 0.1;
const TARGET_RANDOMIZE_INTERVAL = 500;
const TARGET_SIZE_LOWER_BOUND = 15;
const TARGET_SIZE_UPPER_BOUND = 30;
const TARGET_COUNT = 20;

const CANNON_BALL_FILL_COLOR = 'rgb(0, 0, 0)';
const CANNON_BALL_OUTLINE_COLOR ='rgb(0, 0, 0)';
const CANNON_BALL_SIZE = 10;
const CANNON_BALL_ANGLE_SPEED = 0.05;
const CANNON_BALL_RADIUS = 25;
const CANNON_BALL_SPEED = 2.0;
const CANNON_BALL_BOUNCE_COUNT = 3;

var canvas;
var context;

var targets;
var cannonBall;

var score;