// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameCtrl from "./GameCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GroundManager extends cc.Component {

    @property({ type: cc.Prefab, tooltip: 'Ground 1 here' })
    public groundPrefab: cc.Prefab = null;

    @property({ tooltip: 'Number of blocks of the ground' })
    public maxGroundBlocks: number = 1;

    private groundArray: cc.Node[] = [];
    public groundSpeed: number = 5;
    public gameCtrl: GameCtrl = null;
    private offset: number = 0;
    private lastGround: cc.Node = null;

    onLoad() {
        this.generateGroundBlocks();
        cc.director.getCollisionManager().enabled = true;
    }

    protected update(dt: number): void {

        if (this.gameCtrl === null)
            return;

        this.groundSpeed = this.gameCtrl.gameSpeed;
    }

    generateGroundBlocks() {
        var pos = cc.Vec2.ZERO;
        pos.x = 0; 
        pos.y = -(cc.winSize.height / 2);

        for (let i = 0; i < this.maxGroundBlocks; i++) {
            var newGround = cc.instantiate(this.groundPrefab);
            this.node.addChild(newGround);

            this.setGroundPos(newGround, pos);
            
            var controller = newGround.getComponent("GroundMovement");
            controller.setUp(this);
            
            var pipeGenerator = newGround.getComponent("PipesGenerator");
            
            pipeGenerator.positionPipes();
            this.groundArray.push(newGround);
            
            pos.x += newGround.getContentSize().width + this.offset;

            this.lastGround = this.groundArray[i];
        }
    }

    setGroundPos(groundNode, pos) {
        groundNode.setPosition(pos);
    }

    public resetGround(ground) {
        var pipeGenerator = ground.getComponent("PipesGenerator");
        
        pipeGenerator.positionPipes();

        var pos = this.lastGround.position;
        pos.x += this.lastGround.getContentSize().width + this.offset;
        ground.setPosition(pos);

        this.lastGround = ground;
    }

    public resetGame() {
        var pos = cc.Vec2.ZERO;
        pos.x = 0; 
        pos.y = -(cc.winSize.height / 2);

        for (let i = 0; i < this.maxGroundBlocks; i++) {
            var ground = this.groundArray[i];
            this.setGroundPos(ground, pos);

            var pipeGenerator = ground.getComponent("PipesGenerator");

            pipeGenerator.positionPipes();

            pos.x += ground.getContentSize().width + this.offset;

            this.lastGround = this.groundArray[i];
        }
    }
}
