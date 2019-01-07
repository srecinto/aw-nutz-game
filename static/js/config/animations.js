export default function makeAnimations(scene) {
    console.log("config.makeAnimation()");
    
    //Skitters Animations
    scene.anims.create({
        key: "skitters_idle_right",
        frames: scene.anims.generateFrameNumbers("squirrel", { frames: [10, 11, 12, 13, 14, 15, 16] } ),
        framerRate: 1,
        repeat: -1
    });
    
}