import { Plugin, ButtonView } from 'ckeditor5';

export class MyCustomPlugin extends Plugin {
	init(editor) {
		// Register the toolbar button.
		editor.ui.componentFactory.add( 'menuBar:myCustomButton', locale => {
			const view = new ButtonView(locale);

			view.set( {
				label: 'My Custom Button',
				withText: true,
				tooltip: true
			} );

			// Execute a command when the button is clicked.
			view.on( 'execute', () => {
				editor.execute('myCustomCommand');
			} );

			return view;
		} );

		// Add your component in the preferred position.
		editor.ui.extendMenuBar( {
			item: 'menuBar:myCustomButton',
			position: 'after:menuBar:bold'
		} );
    }
}
