var PlayLayer1 = cc.Layer.extend({
    bgSprite:null,
    SushiSprites:null,
    timeout:10,
    score:cc.score,
    ctor:function () {
        this._super();
        this.SushiSprites = [];
        var size = cc.winSize;
        cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist);
        // add bg
        this.bgSprite = new cc.Sprite(res.BackGrounds_png);  
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            //scale: 0.5,
            //rotation: 180
        });
        this.addChild(this.bgSprite, 0);

        this.addSushi();

        this.schedule(this.update,0.2,16*1024,0.2);

        this.scoreLabel = new cc.LabelTTF(cc.score, "Arial", 60);
        this.scoreLabel.attr({
            x:size.width / 2 + 440,
            y:size.height / 2 - 10
        });
        this.addChild(this.scoreLabel, 5);

        this.jumpsLabel = new cc.LabelTTF(cc.jumps, "Arial", 100);
        this.jumpsLabel.attr({
            x:size.width / 2 + 440,
            y:size.height - 150
        });
        this.addChild(this.jumpsLabel, 8);

        // timeout 60
        this.timeoutLabel = cc.LabelTTF.create("ee   " + this.timeout, "Arial", 30);
        this.timeoutLabel.x = 20;
        this.timeoutLabel.y = size.height - 20;
        this.addChild(this.timeoutLabel, 5);
        this.schedule(this.timer,1,this.timeout,1);

        return true;
    },
    addSushi : function() {
        //var sushi = new cc.Sprite(res.Sushi_png);
        var sushi = new SushiSprite(res.Sushi_png);
        var size = cc.winSize;

        var x = 320+size.width/2.7*cc.random0To1();
        sushi.attr({
            x: x,
            y:size.height - 30
        });

        var dorpAction = cc.MoveTo.create(4, cc.p(sushi.x,-700));
        sushi.runAction(dorpAction);

        this.addChild(sushi,5);
        this.SushiSprites.push(sushi);
    },
    update : function() {
        this.addSushi();
    },
    removeSushi : function() {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.SushiSprites.length; i++) {
            cc.log("removeSushi.........");
            if(0 == this.SushiSprites[i].y) {
                cc.log("==============remove:"+i);
                this.SushiSprites[i].removeFromParent();
                this.SushiSprites[i] = undefined;
                this.SushiSprites.splice(i,1);
                i= i-1;
            }
        }
    },
    timer : function() {

        if (this.timeout == 0) {
            //cc.log('游戏结束');
            cc.director.runScene(  new PlayScene3() );
            return;
        }

        this.timeout -=1;
        this.timeoutLabel.setString("" + this.timeout);

    },
    addScore:function(){
        cc.score +=1;
        this.scoreLabel.setString(cc.score);
    }
});

var PlayScene1 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer1();
        this.addChild(layer);
    }
});