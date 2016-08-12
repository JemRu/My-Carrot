var PlayLayer2 = cc.Layer.extend({
    bgSprite:null,
    rabbit:null,
    bone:null,
    downx:null,
    downy:null,
    ctor:function () {
        cc.audioEngine.playMusic(res.StartGame_music, false);
        this._super();
        var size = cc.winSize;
        // add bg
        this.bgSprite = new cc.Sprite(res.BackGrounds_png);  
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            //scale: 0.5,
            //rotation: 180
        });
        this.addChild(this.bgSprite, 0);

        this.addWhole();

        this.addRabbit();

        this.addBone();

        this.scoreLabel = new cc.LabelTTF(""+cc.score, "Arial", 60);
        this.scoreLabel.attr({
            x:size.width / 2 + 420,
            y:size.height / 2 - 10
        });
        this.addChild(this.scoreLabel, 5);

        this.jumpsLabel = new cc.LabelTTF(""+cc.jumps, "Arial", 100);
        this.jumpsLabel.attr({
            x:size.width / 2 + 440,
            y:size.height - 150
        });
        this.addChild(this.jumpsLabel, 8);

        this.bestLabel = new cc.LabelTTF(""+cc.best, "Arial", 60);
        this.bestLabel.attr({
            x:size.width / 2 + 490,
            y:size.height/2 - 135
        });
        this.addChild(this.bestLabel,9);

        this.addTouchEventListenser();
        cc.audioEngine.stopMusic(res.start_music);


        return true;
    },
    addWhole : function() {
        var whole = new WholeSprite(res.Whole_png);
        whole.setPosition(620, 155);

        var size = cc.winSize;
        this.addChild(whole,5);
    },
    addRabbit : function() {
        rabbit = new RabbitSprite(res.Rabbit_png);
        rabbit.setPosition(620, 155);
        var size = cc.winSize;
        this.addChild(rabbit,5);
    },
    addBone : function() {
        bone = new BoneSprite(res.Bone1_png);
        var tempx = 620;
        var tempy = 155*1.7;
        var randomy = Math.random();
        var boney = tempy * randomy;
        bone.setPosition(tempx,250+boney); 
        this.addChild(bone,5);
    },
    addScore:function(){
        cc.score +=1;
        this.scoreLabel.setString(cc.score);
    },
    addJump:function(){
        cc.jumps +=1;
        this.jumpsLabel.setString(cc.jumps);
    },
    // creatJumpAction : function(){
    //     var JumpAction = cc.JumpBy.create(2,0,60,5);
    //     sushi.runAction(JumpAction);
    // },
    addTouchEventListenser:function(){
        this.touchListener = cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
        onMouseUp: function(event){
            var upx = event.getLocationX();
            var upy = event.getLocationY();

            //如如得知道你跳多高
            var currentx =  rabbit.x;
            var currenty =  rabbit.y;
                        
            var bonex = bone.x;
            var boney = bone.y;
            var Jumpx = 0;
            var JumpY = 0;//ground:-30 startplace:0  80
            var JumpH = 200;//unchange

            var moveH = upy - downy; //mousemove total:670
            
            
            // go to distance
            var indexH = boney-currenty+70; //掉到板子上
            var groundH = -currenty+130; //掉到地上
            //cc.log(groundH);
            var onsiteH = 0; //掉到原地
            var restH = 455 + groundH; // current到最高的距离
            
            //如如说你跳多高老子说了算

            switch (true) {
                case (0==moveH|| 0<moveH&&moveH<65):
                    JumpY = 5;
                    break;
                case (65==moveH|| 65<moveH&&moveH<195):
                    JumpY = 20;
                    break;
                case (195==moveH|| 195<moveH&&moveH<260):
                    JumpY = 30;
                    break;
                case (260==moveH|| 260<moveH&&moveH<325):
                    JumpY = 50;
                    break;
                case (325==moveH|| 325<moveH&&moveH<390):
                    JumpY = 80;
                    break;
                case (390==moveH|| 390<moveH&&moveH<455):
                    JumpY = 140;
                    break;
                case (455==moveH|| 455<moveH&&moveH<520):
                    JumpY = 200;
                    break;
                case (520==moveH|| 520<moveH&&moveH<585):
                    JumpY = 400;
                    break;
                case (585==moveH|| 585<moveH):
                    JumpY = 455;
                    break;
            }
            cc.log(JumpY);
            switch (true) {
                case (JumpY+200>restH || JumpY==restH): //装上壁
                    JumpY = groundH;
                    JumpH = restH-groundH;
                    var JumpAction = cc.JumpBy.create(2,cc.p(Jumpx,JumpY),180,1);
                    rabbit.runAction(JumpAction);
                    setTimeout(function(){
                        rabbit.setTexture(res.RabbitH_png);
                    },1000);
                    
                    setTimeout(function(){
                        cc.audioEngine.playMusic(res.Hit_music, false);
                    },950);
                    setTimeout(function(){
                        cc.director.runScene(new EndScene());
                    },3000);
                    break;
                case (JumpY<restH && JumpY+200<indexH): //没跳上去
                    JumpH = JumpH + JumpY;
                    JumpY = onsiteH;
                    break;
                case (JumpY<restH && (JumpY+200>indexH) ): //跳上bone
                    JumpH = 200;
                    JumpY = indexH;

                    var target = event.getCurrentTarget();

                    setTimeout(function(){
                        target.addScore();
                    },1500);
                    setTimeout(function(){
                        target.addJump();
                    },1500);
                    setTimeout(function(){
                        cc.director.runScene(new PlayScene3());
                    },2000);

                    break;
            }
            //如如说给劳资跳起来
            var animation=new cc.Animation();
            for(var i=1;i<19;i++){
                animation.addSpriteFrameWithFile(res.rabbitlist[i]);
            }
            //bi~~~        
            cc.audioEngine.playMusic(res.Jump_music, false);

            animation.setDelayPerUnit(2/50);
            var action =cc.animate(animation);
            rabbit.runAction(action);
            var JumpAction = cc.JumpBy.create(1,cc.p(Jumpx,JumpY),JumpH,1);
            rabbit.runAction(JumpAction);
        },
        onMouseDown: function(event){
            downx = event.getLocationX();
            downy = event.getLocationY();
        }
    },this);
        cc.eventManager.addListener(this.touchListener,this);
    }
});

var PlayScene2 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer2();
        this.addChild(layer);
    }
});