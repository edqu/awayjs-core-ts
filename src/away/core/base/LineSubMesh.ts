///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	/**
	 * LineSubMesh wraps a LineSubGeometry as a scene graph instantiation. A LineSubMesh is owned by a Mesh object.
	 *
	 *
	 * @see away.base.LineSubGeometry
	 * @see away.entities.Mesh
	 *
	 * @class away.base.LineSubMesh
	 */
	export class LineSubMesh extends SubMeshBase implements ISubMesh
	{
		private _subGeometry:LineSubGeometry;

		/**
		 *
		 */
		public get assetType():string
		{
			return away.library.AssetType.LINE_SUB_MESH;
		}

		/**
		 * The LineSubGeometry object which provides the geometry data for this LineSubMesh.
		 */
		public get subGeometry():LineSubGeometry
		{
			return this._subGeometry;
		}

		/**
		 * Creates a new LineSubMesh object
		 * @param subGeometry The LineSubGeometry object which provides the geometry data for this LineSubMesh.
		 * @param parentMesh The Mesh object to which this LineSubMesh belongs.
		 * @param material An optional material used to render this LineSubMesh.
		 */
		constructor(subGeometry:LineSubGeometry, parentMesh:away.entities.Mesh, material:away.materials.IMaterial = null)
		{
			super();

			this._pParentMesh = parentMesh;
			this._subGeometry = subGeometry;
			this.material = material;
		}

		/**
		 * 
		 */
		public dispose()
		{
			this.material = null;

			super.dispose();
		}

		public _iCollectRenderable(renderer:away.render.IRenderer)
		{
			renderer.applyLineSubMesh(this);
		}
	}
}
