///<reference path="../_definitions.ts"/>

module away.textures
{
	import BitmapData					= away.base.BitmapData;
	import IStage						= away.base.IStage;
	import AbstractMethodError			=  away.errors.AbstractMethodError;

	export class CubeTextureBase extends TextureProxyBase
	{
		public _mipmapDataArray:Array<Array<BitmapData>> = new Array<Array<BitmapData>>(6);
		public _mipmapDataDirtyArray:Array<boolean> = new Array<boolean>(6);

		constructor(generateMipmaps:boolean = false)
		{
			super(generateMipmaps);
		}

		/**
		 *
		 * @param width
		 * @param height
		 * @private
		 */
		public _pSetSize(size:number)
		{
			if (this._pSize != size)
				this.invalidateSize();

			for (var i:number = 0; i < 6; i++)
				this._mipmapDataDirtyArray[i] = true;

			this._pSize = size;
		}

		/**
		 * @inheritDoc
		 */
		public dispose()
		{
			super.dispose();

			for (var i:number = 0; i < 6; i++) {
				var mipmapData:Array<BitmapData> = this._mipmapDataArray[i];
				var len:number = mipmapData.length;
				for (var j:number = 0; j < len; j++)
					MipmapGenerator.freeMipMapHolder(mipmapData[j]);
			}
		}

		/**
		 *
		 */
		public invalidateContent():void
		{
			super.invalidateContent();

			for (var i:number = 0; i < 6; i++)
				this._mipmapDataDirtyArray[i] = true;
		}

		/**
		 *
		 * @param stage
		 */
		public activateTextureForStage(index:number, stage:IStage)
		{
			stage.activateCubeTexture(index, this);
		}

		public _iGetMipmapData(side:number):Array<BitmapData>
		{
			if (this._mipmapDataDirtyArray[side]) {
				this._mipmapDataDirtyArray[side] = false;

				var mipmapData:Array<BitmapData> = this._mipmapDataArray[side] || (this._mipmapDataArray[side] = new Array<BitmapData>());
				MipmapGenerator.generateMipMaps(this._iGetTextureData(side), mipmapData, true);
			}

			return this._mipmapDataArray[side];
		}

		public _iGetTextureData(side:number):any
		{
			throw new AbstractMethodError();
		}
	}
}