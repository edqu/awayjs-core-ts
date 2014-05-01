///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.gl
{
	/**
	 *
	 */
	export class IndexDataPool
	{
		private static _pool:Object = new Object();

		constructor()
		{
		}

		public static getItem(id:number, level:number):away.gl.IndexData
		{
			var subGeometryData:Array<IndexData> = <Array<IndexData>> (IndexDataPool._pool[id] || (IndexDataPool._pool[id] = new Array<IndexData>()));

			return subGeometryData[level] || (subGeometryData[level] = new IndexData(level));
		}

		public static disposeItem(id:number, level:number)
		{
			var subGeometryData:Array<IndexData> = <Array<IndexData>> this._pool[id];

			subGeometryData[level].dispose();
			subGeometryData[level] = null;
		}

		public disposeData(id:number)
		{
			var subGeometryData:Array<IndexData> = <Array<IndexData>> IndexDataPool._pool[id];

			var len:number = subGeometryData.length;
			for (var i:number = 0; i < len; i++) {
				subGeometryData[i].dispose();
				subGeometryData[i] = null;
			}

			IndexDataPool._pool[id] = null;
		}
	}
}