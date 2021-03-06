///<reference path="../../build/awayjs-core.next.d.ts" />

module tests.events
{
	import Delegate				= away.utils.Delegate;

    export class EDTest extends away.events.EventDispatcher
    {

        constructor()
        {

            super();

            console.log( 'Before addEventListener: ' , this.hasEventListener( away.events.Event.COMPLETE  ) ) ;
            this.addEventListener( away.events.Event.COMPLETE , Delegate.create(this, this.onComplete) );
            console.log( 'After addEventListener: ' , this.hasEventListener( away.events.Event.COMPLETE  ) ) ;
            this.removeEventListener( away.events.Event.COMPLETE , Delegate.create(this, this.onComplete) );
            console.log( 'After removeEventListener: ' , this.hasEventListener( away.events.Event.COMPLETE  ) )  ;

        }

        public onComplete( e )
        {


        }

    }


}
