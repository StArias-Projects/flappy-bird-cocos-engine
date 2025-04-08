// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BirdAudio from "./BirdAudio";
import { BirdClips } from "./BirdAudio"; // Import the enum

import GameCtrl from "./GameCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bird extends cc.Component {
    @property({ type: cc.Float })
    public jumpHeight: number = 3.5;

    @property({ type: cc.Float })
    public jumpDuration: number = 3.5;

    @property({ type: cc.Animation })
    public birdAnimation: cc.Animation = null;

    @property({ type: cc.RigidBody3D })
    public rigidBody3D: cc.RigidBody3D = null;

    @property({type: BirdAudio})
    public birdAudio: BirdAudio = null;

    public gameCtrl: GameCtrl = null;
    public birdLocation = new cc.Vec3;
    private initialPos = new cc.Vec3;

    protected onLoad(): void {
        this.initialPos = this.node.position;
        this.birdAnimation.play();
        this.resetBird();
        var collider = this.getComponent(cc.SphereCollider3D);
        if (collider) {
            collider.on('collision-enter', this.onCollisionEnter, this);
            collider.on('trigger-enter', this.onTriggerEnter, this);
        }
    }


    public resetBird() {
        this.node.setPosition(this.initialPos);
    }

    onCollisionEnter(event) {
        // Get the group of the collider we're colliding with
        let otherGroup = event.otherCollider.node.group;
        // Check which group we're colliding with
        if (otherGroup === 'object') {
            this.birdAudio.playClip(BirdClips.HIT);
            this.birdAudio.playClip(BirdClips.DIE);
            this.gameCtrl.gameOver();
        }
    }

    onTriggerEnter(event) {
        // Get the group of the collider we're colliding with
        let otherGroup = event.otherCollider.node.group;
        // Check which group we're colliding with
        if (otherGroup === 'completed') {
            this.gameCtrl.addScore();
            this.birdAudio.playClip(BirdClips.SCORE);
        }
    }

    public fly() {
        if (this.rigidBody3D)
            this.rigidBody3D.setLinearVelocity(cc.Vec3.ZERO);

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
        var posOfJump = new cc.Vec3(this.node.position.x, this.node.position.y + this.jumpHeight);
        
        this.birdAudio.playClip(BirdClips.FLY);
        cc.tween(this.node)
        .to(this.jumpDuration, { position: posOfJump }, {
            easing: "smooth",
            onUpdate: (target: cc.Vec3, ratio: number) => {
                this.node.setPosition(target);
            }
            }).start();

        this.birdAnimation.play();
    }
}
