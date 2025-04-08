// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

export enum BirdClips{
    UNDEFINED = -1,
    FLY = 0, 
    SCORE = 1,
    HIT = 2,
    DIE = 3,
}

@ccclass
export default class BirdAudio extends cc.Component {

    @property({ type: cc.AudioClip })
    public clips: cc.AudioClip [] = [];

    public playClip(clip: BirdClips, loop: boolean = false){
        if(clip < 0  || clip >= this.clips.length){
            return;
        }

        cc.audioEngine.playEffect(this.clips[clip], loop);
    }
}
