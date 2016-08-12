var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("Hello World", "", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2;
        this.addChild(helloLabel);

        // add bg
        this.bgSprite = new cc.Sprite(res.BackGround1_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.bgSprite, 0);

        //add start menu
        var startItem = new cc.MenuItemImage(
            res.StartA_png,
            res.StartB_png,
            function () {
                cc.log("Menu is clicked!");
                // cc.director.replaceScene(new PlayScene());
                cc.director.pushScene(new StartScene());
                cc.director.runScene(new PlayScene2());
        }, this);
        startItem.attr({
            x: size.width/2,
            y: size.height/6,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        cc.audioEngine.playMusic(res.start_music, true);

        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});