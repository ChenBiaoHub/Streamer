cc.Class({
    extends: cc.Component,

    properties: {
        //流光速度
        speed: {
            default: 1,
            type: cc.Float,
        },

        //启动位置
        minX: {
            default: 0.5,
            type: cc.Float,
        },

        //终止位置
        maxX: {
            default: 1.3,
            type: cc.Float,
        },

        //流光宽度
        lightWidth: {
            default: 0.2,
            type: cc.Float,
        },

        //流光亮度
        lightStrength: {
            default: 0.003,
            type: cc.Float,
        }
    },


    onLoad () {
        this.spr = this.node.getComponent(cc.Sprite);
        this.mat = null;

        let self = this;
        cc.loader.loadRes('materials/streamer', ((err, res)=> {
            self._time = 0.0;
            self.mat = res;
            self.spr.setMaterial(0, res);
        }));
    },


    update (dt) {
        if (this.mat === null) {
            return;
        }

        if (this.spr.getMaterial(0)._name != 'streamer (Instance)') {
            this.spr.setMaterial(0, this.mat);
        }

        if (this.spr.getMaterial(0).effect._properties.start_x) {
            this.spr.getMaterial(0).effect._properties.light_width.value = this.lightWidth;
            this.spr.getMaterial(0).effect._properties.light_strength.value = this.lightStrength;

            this._time += dt;
            this._dis = this._time * this.speed;
            if(this._dis > this.maxX){
                this._time = 0;
                this._dis = 0;
            }
            let a = this._dis;
            this.spr.getMaterial(0).effect._properties.start_x.value = this._dis;
        }
    },

});
