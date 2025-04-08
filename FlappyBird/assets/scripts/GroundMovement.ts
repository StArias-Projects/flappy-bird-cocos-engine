// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GroundManager from "./GroundManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GroundMovement extends cc.Component {

    private groundManager: GroundManager = null;
    private groundSpeed: number = 0;

    private width = 0;
    protected onLoad(): void {
        this.width = this.node.getContentSize().width;
    }

    public setUp(groundManager) {
        this.groundManager = groundManager;
    }

    private reset() {
        this.groundManager.resetGround(this.node);
    }

    update(dt) {
        if(this.groundManager === null)
            return;

        this.groundSpeed = this.groundManager.groundSpeed;

        if(this.groundSpeed === 0)
            return;

        var pos = this.node.position;
        pos.x -= this.groundSpeed * dt;

        this.node.setPosition(pos);

        if (pos.x <= (-(cc.winSize.width / 2) - this.width)) {
            this.reset();
        }
    }
}
