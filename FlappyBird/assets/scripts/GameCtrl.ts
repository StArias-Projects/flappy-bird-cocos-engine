// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GroundManager from "./GroundManager";
import Results from "./Results";
import Bird from "./Bird";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtrl extends cc.Component {

    @property({ type: GroundManager })
    public groundManager: GroundManager = null;

    @property({ type: Bird })
    public bird: Bird = null;

    @property({ type: Results })
    public results: Results = null;

    @property({ type: cc.Integer })
    maxSpeed: number = 10;

    @property({ type: cc.Float })
    minSpeed: number = 1;

    @property({ type: cc.Float })
    speedIncreaseRate: number = 2;

    @property({ type: cc.Float })
    increaseSpeedEveryThisSeconds: number = 2;

    @property({ type: cc.Float })
    customGravity: number = -9.8;

    public gameSpeed: number = 0;
    private timer: number = 0;

    protected onLoad(): void {
        this.gameSpeed = this.minSpeed;
        this.groundManager.gameCtrl = this;
        this.bird.gameCtrl = this;
        this.resetGame();
        this.gameOver();
        this.enableDirectorStuff();
        this.initInputListener();
    }

    private enableDirectorStuff() {

        var physics2D = cc.director.getPhysicsManager();
        physics2D.enabled = true;
        physics2D.enabledAccumulator = true;
        cc.PhysicsManager.FIXED_TIME_STEP = 1 / 60;
        
        var physics = cc.director.getPhysics3DManager();
        physics.enabled = true;
        physics.gravity = new cc.Vec3(0, 0, 0);

        var manager = cc.director.getCollisionManager();

        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    }

    protected update(dt: number): void {
        this.increaseSpeed(dt);
    }

    // onKeyDown(event) {
    //     switch (event.keyCode) {
    //         case cc.macro.KEY.q:
    //             this.gameOver();
    //             break;
    //         case cc.macro.KEY.w:
    //             this.results.addScore();
    //             break;
    //         case cc.macro.KEY.e:
    //             this.resetGame();
    //             break;
    //     }
    // }

    initInputListener() {
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            if (cc.director.isPaused()) {
                this.resetGame()
            }

            this.bird.fly();
        })
    }

    startGame() {
        this.results.hideResults();
        cc.director.resume();
    }

    gameOver() {
        this.results.showResults();
        cc.director.pause();
    }

    addScore() {
        this.results.addScore();
    }

    resetGame() {
        this.results.resetScore();
        this.groundManager.resetGame();
        this.gameSpeed = this.minSpeed;
        this.timer = 0;
        this.bird.resetBird();
        this.startGame();
    }

    increaseSpeed(dt: number): void {
        if (this.gameSpeed === this.maxSpeed) {
            return;
        }
        else if (this.gameSpeed > this.maxSpeed) {
            this.gameSpeed = this.maxSpeed;
            return;
        }

        this.timer += dt;

        if (this.timer >= this.increaseSpeedEveryThisSeconds) {
            this.gameSpeed += this.speedIncreaseRate;
            this.timer = 0;
        }
    }
}
