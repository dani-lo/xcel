import React from 'react';

import './foo.scss';

class App extends React.PureComponent {
	render() {
		return (
			<div>
				<h1>Hello World nauuu{alert(dafoo)}!</h1>
			</div>
		);
	}
}

export default App;