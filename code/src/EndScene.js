var EndLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;

        // add bg
        cc.audioEngine.playMusic(res.Over_music, false);
        this.bgSprite = new cc.Sprite(res.BackGrounds_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.bgSprite, 0);

        //add agian menu
        var startItem = new cc.MenuItemImage(
            res.Agian_png,
            res.Agian_png,
            function () {
                cc.score = 0;
                cc.jumps = 0;
                cc.director.runScene(new PlayScene2());
        }, this);
        startItem.attr({
            x: size.width/2,
            y: size.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        //add share menu
        var startItem2 = new cc.MenuItemImage(
        res.Share_png,
        res.Share_png,
        function () {

        }, this);
        startItem2.attr({
        x: size.width/2,
        y: size.height/2.8,
        anchorX: 0.5,
        anchorY: 0.5
        });

        var menu2 = new cc.Menu(startItem2);
        menu2.x = 0;
        menu2.y = 0;
        this.addChild(menu2, 2);

        // add score 
        this.scoreLabel = new cc.LabelTTF(""+cc.score, "Arial", 60);
        this.scoreLabel.attr({
            x:size.width / 2 + 440,
            y:size.height / 2 - 10
        });
        this.addChild(this.scoreLabel,5);
        cc.log(cc.score);

        this.scoreLabel1 = new cc.LabelTTF(""+cc.score, "Arial", 90);
        this.scoreLabel1.attr({
            x:size.width / 2,
            y:size.height / 2 + 200
        });
        this.addChild(this.scoreLabel1,6);

        this.jumpsLabel = new cc.LabelTTF(""+cc.jumps, "Arial", 100);
        this.jumpsLabel.attr({
            x:size.width / 2 + 440,
            y:size.height - 150
        });
        this.addChild(this.jumpsLabel, 8);

        cc.best = (cc.score>cc.best)? cc.score : cc.best ;
        this.bestLabel = new cc.LabelTTF(""+cc.best, "Arial", 60);
        this.bestLabel.attr({
            x:size.width / 2 + 490,
            y:size.height/2 - 135
        });
        this.addChild(this.bestLabel,8);

        this.addPanel();

        this.addRabbit();

        return true;
    },
    addPanel : function() {
        var point = new WholeSprite(res.Point_png);
        point.setPosition(620, 520);

        var size = cc.winSize;
        this.addChild(point,5);
    },
    addRabbit : function() {
        var rabbit = new WholeSprite(res.RabbitH_png);
        rabbit.setPosition(620, 120);
        var size = cc.winSize;
        this.addChild(rabbit,8);
    }
});

var EndScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new EndLayer();
        this.addChild(layer);
    }
});