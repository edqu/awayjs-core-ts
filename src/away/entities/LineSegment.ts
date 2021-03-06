﻿module away.entities
{
	import IAnimator					= away.animators.IAnimator;
	import MaterialEvent				= away.events.MaterialEvent;
	import Matrix3D						= away.geom.Matrix3D;
	import UVTransform					= away.geom.UVTransform;
	import Vector3D						= away.geom.Vector3D;
	import IMaterial					= away.materials.IMaterial;

	/**
	 * A Line Segment primitive.
	 */
	export class LineSegment extends away.base.DisplayObject implements IEntity, away.base.IMaterialOwner
	{
		private _animator:IAnimator;
		private _material:IMaterial;
		private _uvTransform:UVTransform;

		private onSizeChangedDelegate:(event:MaterialEvent) => void;

		public _startPosition:Vector3D;
		public _endPosition:Vector3D;
		public _halfThickness:number;


		/**
		 * Defines the animator of the line segment. Act on the line segment's geometry. Defaults to null
		 */
		public get animator():IAnimator
		{
			return this._animator;
		}

		/**
		 *
		 */
		public get assetType():string
		{
			return away.library.AssetType.LINE_SEGMENT;
		}

		/**
		 *
		 */
		public get startPostion():Vector3D
		{
			return this._startPosition;
		}

		public set startPosition(value:Vector3D)
		{
			if (this._startPosition == value)
				return;

			this._startPosition = value;

			this.notifyRenderableUpdate();
		}

		/**
		 *
		 */
		public get endPosition():Vector3D
		{
			return this._endPosition;
		}

		public set endPosition(value:Vector3D)
		{
			if (this._endPosition == value)
				return;

			this._endPosition = value;

			this.notifyRenderableUpdate();
		}

		/**
		 *
		 */
		public get material():IMaterial
		{
			return this._material;
		}

		public set material(value:IMaterial)
		{
			if (value == this._material)
				return;

			if (this._material) {
				this._material.iRemoveOwner(this);
				this._material.removeEventListener(MaterialEvent.SIZE_CHANGED, this.onSizeChangedDelegate);
			}


			this._material = value;

			if (this._material) {
				this._material.iAddOwner(this);
				this._material.addEventListener(MaterialEvent.SIZE_CHANGED, this.onSizeChangedDelegate);
			}
		}

		/**
		 *
		 */
		public get thickness():number
		{
			return this._halfThickness*2;
		}

		public set thickness(value:number)
		{
			if (this._halfThickness == value)
				return;

			this._halfThickness = value*0.5;

			this.notifyRenderableUpdate();
		}

		/**
		 *
		 */
		public get uvTransform():UVTransform
		{
			return this._uvTransform;
		}

		public set uvTransform(value:away.geom.UVTransform)
		{
			this._uvTransform = value;
		}

		/**
		 * Create a line segment
		 *
		 * @param startPosition Start position of the line segment
		 * @param endPosition Ending position of the line segment
		 * @param thickness Thickness of the line
		 */
		constructor(material:IMaterial, startPosition:Vector3D, endPosition:Vector3D, thickness:number = 1)
		{
			super();

			this._pIsEntity = true;

			this.onSizeChangedDelegate = (event:MaterialEvent) => this.onSizeChanged(event);

			this.material = material;

			this._startPosition = startPosition;
			this._endPosition = endPosition;
			this._halfThickness = thickness*0.5;
		}

		public dispose()
		{
			this._startPosition = null;
			this._endPosition = null;
		}

		/**
		 * @protected
		 */
		public pCreateEntityPartitionNode():away.partition.EntityNode
		{
			return new away.partition.EntityNode(this);
		}

		/**
		 * @protected
		 */
		public pUpdateBounds()
		{
			this._pBounds.fromExtremes(this._startPosition.x, this._startPosition.y, this._startPosition.z, this._endPosition.x, this._endPosition.y, this._endPosition.z);

			super.pUpdateBounds();
		}

		/**
		 * @private
		 */
		private onSizeChanged(event:MaterialEvent)
		{
			this.notifyRenderableUpdate();
		}

		/**
		 * @private
		 */
		private notifyRenderableUpdate()
		{
			var len:number = this._pRenderables.length;
			for (var i:number = 0; i < len; i++)
				this._pRenderables[i].invalidateVertexData("vertices"); //TODO
		}

		public _iCollectRenderables(renderer:away.render.IRenderer)
		{
			// Since this getter is invoked every iteration of the render loop, and
			// the prefab construct could affect the sub-meshes, the prefab is
			// validated here to give it a chance to rebuild.
			if (this._iSourcePrefab)
				this._iSourcePrefab._iValidate();

			this._iCollectRenderable(renderer);
		}

		public _iCollectRenderable(renderer:away.render.IRenderer)
		{
			//TODO
		}
	}
}
