// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Results extends cc.Component {

    @property({type: cc.Label})
    public scoreLabel: cc.Label = null;
    
    @property({type: cc.Label})
    public highScore: cc.Label = null;
    
    @property({type: cc.Label})
    public endResult: cc.Label = null;

    maxScore: number = 0;
    currentScore: number = 0;

    public updateScore(score: number){
        this.currentScore = score;
        this.scoreLabel.string = ('' + this.currentScore);
    }
    
    public resetScore(){
        this.updateScore(0);
        this.hideResults();
    }

    public addScore(){
        this.updateScore(this.currentScore + 1);
    }

    public showResults(){
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.highScore.string = ('High Score: ' + this.maxScore);
        this.highScore.node.active = true;
        this.endResult.node.active = true;
    }

    public hideResults(){
        this.highScore.node.active = false;
        this.endResult.node.active = false;
    }
}
