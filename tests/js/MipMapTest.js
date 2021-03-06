///<reference path="../../build/awayjs-core.next.d.ts" />
var tests;
(function (tests) {
    (function (utils) {
        var Delegate = away.utils.Delegate;

        var MipMapTest = (function () {
            function MipMapTest() {
                var _this = this;
                this._rect = new away.geom.Rectangle();
                this._matrix = new away.geom.Matrix();
                //---------------------------------------
                // Load a PNG
                var mipUrlRequest = new away.net.URLRequest('assets/1024x1024.png');
                this.mipLoader = new away.net.URLLoader();
                this.mipLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
                this.mipLoader.load(mipUrlRequest);
                this.mipLoader.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.mipImgLoaded));

                document.onmousedown = function (e) {
                    return _this.onMouseDown(e);
                };
            }
            MipMapTest.prototype.mipImgLoaded = function (e) {
                var _this = this;
                var loader = e.target;
                var image = away.parsers.ParserUtils.blobToImage(loader.data);
                image.onload = function (event) {
                    return _this.onImageLoad(event);
                };
            };

            MipMapTest.prototype.onImageLoad = function (event) {
                var image = event.target;
                alert('Each click will generate a level of MipMap');

                this.sourceBitmap = new away.base.BitmapData(1024, 1024, true, 0xff0000);
                this.sourceBitmap.drawImage(image, this.sourceBitmap.rect, this.sourceBitmap.rect);
                this.sourceBitmap.canvas.style.position = 'absolute';
                this.sourceBitmap.canvas.style.left = '0px';
                this.sourceBitmap.canvas.style.top = '1030px';

                //document.body.appendChild( this.sourceBitmap.canvas );
                this.mipMap = new away.base.BitmapData(1024, 1024, true, 0xff0000);
                this.mipMap.canvas.style.position = 'absolute';
                this.mipMap.canvas.style.left = '0px';
                this.mipMap.canvas.style.top = '0px';

                document.body.appendChild(this.mipMap.canvas);

                this._rect.width = this.sourceBitmap.width;
                this._rect.height = this.sourceBitmap.height;

                this.w = this.sourceBitmap.width;
                this.h = this.sourceBitmap.height;
            };

            MipMapTest.prototype.onMouseDown = function (e) {
                this.generateMipMap(this.sourceBitmap, this.mipMap);
            };

            MipMapTest.prototype.generateMipMap = function (source, mipmap, alpha, side) {
                if (typeof mipmap === "undefined") { mipmap = null; }
                if (typeof alpha === "undefined") { alpha = false; }
                if (typeof side === "undefined") { side = -1; }
                var c = this.w;
                var i;

                console['time']('MipMap' + c);

                if ((this.w >= 1) || (this.h >= 1)) {
                    if (alpha) {
                        mipmap.fillRect(this._rect, 0);
                    }

                    this._matrix.a = this._rect.width / source.width;
                    this._matrix.d = this._rect.height / source.height;

                    mipmap.width = this.w;
                    mipmap.height = this.h;
                    mipmap.copyPixels(source, source.rect, new away.geom.Rectangle(0, 0, this.w, this.h));

                    this.w >>= 1;
                    this.h >>= 1;

                    this._rect.width = this.w > 1 ? this.w : 1;
                    this._rect.height = this.h > 1 ? this.h : 1;
                }

                console.log('away.utils.TextureUtils.isBitmapDataValid: ', away.utils.TextureUtils.isBitmapDataValid(mipmap));

                console['timeEnd']('MipMap' + c);
            };
            return MipMapTest;
        })();
        utils.MipMapTest = MipMapTest;
    })(tests.utils || (tests.utils = {}));
    var utils = tests.utils;
})(tests || (tests = {}));
//# sourceMappingURL=MipMapTest.js.map
