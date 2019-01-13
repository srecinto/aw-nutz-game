export default function makeAnimations(scene) {
    console.log("config.makeAnimation()");
    
    //Skitters Animations
    scene.anims.create({
        key: "skitters_idle_right",
        frames: scene.anims.generateFrameNumbers("squirrel", { frames: [
            10, 10, 10, 10, 10, 10,  // Pause Right
            13, 12, 11, 11, 11, 13,  // Look Left
            10, 10, 10, 10, 10, 10,  // Pause Right
            13, 12, 11, 11, 11, 13,  // Look Left
            10, 10, 10, 10, 10, 10,  // Pause Right
            13, 13, 14, 14, 14, 13,  // Wink
            13, 12, 11, 11, 11, 13   // Look Left
            ] } ),
        frameRate: 10,
        repeat: -1
    });
    
    scene.anims.create({
        key: "skitters_move_down",
        frames: scene.anims.generateFrameNumbers("squirrel", { frames: [
            26, 25, 24, 24, 24, 24, 24, 25, 26
            ] } ),
        frameRate: 24,
        repeat: 0
    });
    
    scene.anims.create({
        key: "skitters_move_up",
        frames: scene.anims.generateFrameNumbers("squirrel", { frames: [
            27, 28, 29, 29, 29, 29, 29, 28, 27
            ] } ),
        frameRate: 24,
        repeat: 0
    });
    
    scene.anims.create({
        key: "skitters_move_right",
        frames: scene.anims.generateFrameNumbers("squirrel", { frames: [
            15, 16, 17, 18, 19, 20, 21, 22, 23
            ] } ),
        frameRate: 24,
        repeat: 0
    });
    
    
}