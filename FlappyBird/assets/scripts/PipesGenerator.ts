// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class PipesGenerator extends cc.Component {

    @property()
    public gapBetweenPipes: number = 100;

    @property(cc.Node)
    public pipesParent: cc.Node = null;

    private operativeWindow: number;

    protected onLoad(): void {
        this.operativeWindow = cc.winSize.height - this.node.height - this.gapBetweenPipes;
    }

    public positionPipes() {
        var randomY = Math.random() * (this.operativeWindow - this.node.height) + this.node.height;
        this.pipesParent.setPosition(new cc.Vec2(this.node.width / 2, randomY));
    }
}
